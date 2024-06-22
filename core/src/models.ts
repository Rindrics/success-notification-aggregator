export class ReceiveRecord {
  receiveRecordId: string;
  actualMessage: string;
  expectedPattern: string;
  endpoint: string;

  constructor(
    receiveRecordId: string,
    actualMessage: string,
    expectedPattern: string,
    endpoint: string,
  ) {
    this.receiveRecordId = receiveRecordId;
    this.actualMessage = actualMessage;
    this.expectedPattern = expectedPattern;
    this.endpoint = endpoint;
  }

  asExpected(): boolean {
    const pattern = new RegExp(this.expectedPattern);
    return pattern.test(this.actualMessage);
  }
}
