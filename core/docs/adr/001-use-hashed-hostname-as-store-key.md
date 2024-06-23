# Use hashed base URL as store key when saving ReceiveRecord

status: valid
date: 2024-06-22

## Context

Considering:

- how to check message of all receive records are as expected
- how to extract ReceiveRecord (RR) stored by self success-notification-aggretagondor (SNA) instance

## Condition

- Multiple SNA instance may store RR to single DataStore
- Processing RR stored by the other SNA instance will harm value of this software
- Use object storage for data store

## Decision

Use hashed hostname of SuccessNotificationEndpoint as store key when saving ReceiveRecord

Reasons:

- base URL is unique among the internet
- getByHostId() of RR repository will effective to extract RRs stored by the self SNA instance

> [!NOTE]
> Given `https://hostname/foo/bar/endpoint`, "base URL" means `hostname/foo/bar`.

### Example

If you subscribe three target services with independent endpoints:

- https://example.com/receive/service1
- https://example.com/receive/service2
- https://example.com/receive/service3

SNA instance stores each message as below

```json
{
    "hashedBaseURL": [
        "service1": {
            "actualMessage": "some-message",
            "expectedPattern": "some-pattern"
        },
        "service2": {
            "actualMessage": "some-message",
            "expectedPattern": "some-pattern"
        },
        "service3": {
            "actualMessage": "some-message",
            "expectedPattern": "some-pattern"
        }
    ]
}
```
