export class ReceiveRecord {
  receiveRecordId: string;
  actualMessage: string;
  expectedPattern: string;
  aggregatorInstanceId: string

  constructor(
    receiveRecordId: string,
    actualMessage: string,
    expectedPattern: string,
    aggregatorInstanceId: string,
  ) {
    this.receiveRecordId = receiveRecordId;
    this.actualMessage = actualMessage;
    this.expectedPattern = expectedPattern;
    this.aggregatorInstanceId = aggregatorInstanceId;
  }
}
