import { ReceiveRecord } from "../src/models";

describe("ReceiveRecord", () => {
  it("should create a valid ReceiveRecord", () => {
    const receiveRecordId = "some-id";
    const actualMessage = "some message";
    const expectedPattern = "expected pattern";
    const endpoint = "another-id";

    const record = new ReceiveRecord(
      receiveRecordId,
      actualMessage,
      expectedPattern,
      endpoint,
    );

    expect(record.receiveRecordId).toBe(receiveRecordId);
    expect(record.actualMessage).toBe(actualMessage);
    expect(record.expectedPattern).toBe(expectedPattern);
    expect(record.endpoint).toBe(endpoint);
  });

  it("return true if its actual message matches with expected pattern", () => {
    const expectedPattern = "^some m.+e$";
    const willMatchActualMessage = "some message";

    const receiveRecordId = "some-id";
    const endpoint = "another-id";

    const record = new ReceiveRecord(
      receiveRecordId,
      willMatchActualMessage,
      expectedPattern,
      endpoint,
    );
    expect(record.asExpected()).toBe(true);
  });

  it("return false if its actual message doesn't match with expected pattern", () => {
    const expectedPattern = "^some m.+e$";
    const wontMatchActualMessage = "some message that wont match";

    const receiveRecordId = "some-id";
    const endpoint = "another-id";

    const record = new ReceiveRecord(
      receiveRecordId,
      wontMatchActualMessage,
      expectedPattern,
      endpoint,
    );
    expect(record.asExpected()).toBe(false);
  });
});
