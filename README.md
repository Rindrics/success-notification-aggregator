# success-notification-aggregator

> [!WARNING]
> This is a WIP project

A tool to consolidate success notifications into a single, reliable report.

Benefits:
- **Uncluttered Success Monitoring**: Aggregates multiple success notifications into a single one
- **Enhanced Reliability**: Reduces the risk of missing critical failure alert
- **Cost-Effective**: Minimizes maintenance overhead by utilizing Slack Platform

## Introduction

Managing multiple success notifications can be challenging and error-prone, especially when one goes missing.
success-notice-aggregator (SNA) is designed to solve this problem by consolidating expected notifications and ensuring none are missed.

## How It Works

### Architecture Overview

```mermaid
flowchart LR
    subgraph ExternalInput
        BatchSystem[Watched Process]
    end
    subgraph ExternalOutput
        SlackAPI[Slack API]
        DB[("SlackDatastore|DynamoDB|Cassandra")]
    end

    subgraph System
        subgraph InAdapters["Adapters (in)"]
            SuccessNotificationEndpoint["SuccessNotificationEndpoint\n(Slack|AWS|K8s)"]
            CheckSchedulerAdapters["SchedulerAdapter(EventBridge|Slack|Kron)"]
        end

        subgraph OutAdapters["Adapters (out)"]
            SlackNotifierAdapter
            DbAdapters["DbAdapter(Slack Datastore|DynamoDb|Cassandra)"]
        end

        subgraph ApplicationService
            Config
            ConfigRepository
            StoreService
            CheckService
            EventBroker

            subgraph CoreDomain
                ReceiveRecord
                NotifyContent
                ReceiveRecordRepository
                ReceiveRecordService
            end

            subgraph IncomingPorts["Ports (in)"]
                SuccessNotificationReceiver
                CheckScheduler
            end

            subgraph OutgoingPorts["Ports (out)"]
                NotificationSender
            end
        end
    end

    %% Data Flow
    BatchSystem --> |Sends success notification| SuccessNotificationEndpoint
    SuccessNotificationEndpoint -.-> |Implements| SuccessNotificationReceiver
    SuccessNotificationReceiver --> |SuccessNotificationReceived| EventBroker
    StoreService --> |Subscribes| EventBroker
    StoreService --> |Delegates storing| ReceiveRecordService
    ReceiveRecordService --> |Creates| ReceiveRecord
    ReceiveRecordService --> |Delegates writing| ReceiveRecordRepository
    Config --> |Provides| SuccessNotificationEndpoint
    Config --> |Provides| StoreService
    Config --> |Provides| CheckScheduler
    CheckScheduler --> |CheckScheduled| EventBroker
    CheckService --> |Subscribes| EventBroker
    CheckService --> |Delegates checking| ReceiveRecordService
    ReceiveRecordService --> |Delegates checking| ReceiveRecord
    ReceiveRecord --> |"Check()"| ReceiveRecord
    ReceiveRecordService --> |Delegates reading| ReceiveRecordRepository
    CheckService --> |Delegates creation| NotifyContent
    CheckService --> |Delegates sending| NotificationSender
    SlackNotifierAdapter --> |POST| SlackAPI
    SlackNotifierAdapter -.-> |Implements| NotificationSender
    CheckService --> |Delegates deletion| ReceiveRecordService
    ReceiveRecordService --> |Delegates deletion| ReceiveRecordRepository
    DbAdapters -.-> |Implements| ReceiveRecordRepository
    DbAdapters -.-> |Implements| ConfigRepository
    DbAdapters  --> |SELECT/INSERT/UPDATE| DB
    CheckSchedulerAdapters -.-> |Implements| CheckScheduler
    Config --> |Reads/Writes| ConfigRepository
    ExternalInput ~~~ InAdapters
```

1. **Configuration**:
   - Define expected success notifications using regex patterns.
   - Specify URLs to check in case of missing notifications.
   - Configure a schedule for regular checks.
   - Provide necessary permissions for Slack integration.
   - Specify channels for sending success messages or failure alerts.

2. **Event-Driven Operations**:
   - **POST Event**: When a success notification is received, SNA converts it into a `ReceiveRecord` by assigning a unique ID. This record is then posted to the Slack Platform via the `SuccessNotificationEndpointAdapter`.
   - **Scheduled Event**: On a defined schedule, SNA checks the arrival of all expected notifications and sends alerts if any of them are missing via the `CheckSchedulerAdapter`.

3. **Identity Verification of Notification**:
   - SNA verifies the identity of success notifications by adding a hash value generated from the following:
     - Config file of the Slack Platform for the SNA.
     - Registered name of the watched batch process.
     - Regex pattern of expected success notification for each watched batch process.
   - This identity verification ensures accurate monitoring by avoiding false-positive failure alerts, especially when multiple SNAs are monitoring the same batch process. Each `ReceiveRecord` created from a success notification ensures that the same notification can be correctly identified and verified during checks.

4. **Transformation and Storage**:
   - Upon receiving a success notification, the system processes it through several stages:
     - **ID Assignment**: Assigns a unique identifier to create a `ReceiveRecord`.
     - **Storage**: Stores the `ReceiveRecord` in the configured repository (`Slack Datastore`, `DynamoDB`, `Cassandra`).

5. **Regular Checks**:
   - The Scheduler triggers regular checks.
   - The system verifies the stored `ReceiveRecords` to ensure all expected notifications are present.
   - If any notification is missing, an alert is generated and sent via Slack.
