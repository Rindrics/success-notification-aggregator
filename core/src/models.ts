export class ReceiveRecord {
  receiveRecordId: string;
  baseUrlHash: string;
  endpoint: string;
  actualMessage: string;
  expectedPattern: string;

  constructor(
    receiveRecordId: string,
    baseUrlHash: string,
    endpoint: string,
    actualMessage: string,
    expectedPattern: string,
  ) {
    this.receiveRecordId = receiveRecordId;
    this.baseUrlHash = baseUrlHash;
    this.endpoint = endpoint;
    this.actualMessage = actualMessage;
    this.expectedPattern = expectedPattern;
  }

  asExpected(): boolean {
    const pattern = new RegExp(this.expectedPattern);
    return pattern.test(this.actualMessage);
  }
}
