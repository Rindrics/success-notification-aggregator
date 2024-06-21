export class ReceiveRecord {
  id: string;
  actualMessage: string;
  expectedPattern: string;

  constructor(
    id: string,
    actualMessage: string,
    expectedPattern: string,
  ) {
    this.id = id;
    this.actualMessage = actualMessage;
    this.expectedPattern = expectedPattern;
  }
}
