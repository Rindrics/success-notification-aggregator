import { ReceiveRecord } from "../src/models";

describe("ReceiveRecord", () => {
  it("should create a valid ReceiveRecord", () => {
    const receiveRecordId = "some-id";
    const baseUrlHash = "some-hash";
    const watchedProcess = "processA";
    const actualMessage = "some message";
    const expectedPattern = "expected pattern";

    const record = new ReceiveRecord(
      receiveRecordId,
      baseUrlHash,
      watchedProcess,
      actualMessage,
      expectedPattern,
    );

    expect(record.receiveRecordId).toBe(receiveRecordId);
    expect(record.baseUrlHash).toBe(baseUrlHash);
    expect(record.watchedProcess).toBe(watchedProcess);
    expect(record.actualMessage).toBe(actualMessage);
    expect(record.expectedPattern).toBe(expectedPattern);
  });

  it("return true if its actual message matches with expected pattern", () => {
    const expectedPattern = "^some m.+e$";
    const willMatchActualMessage = "some message";

    const receiveRecordId = "some-id";
    const baseUrlHash = "some-hash";
    const watchedProcess = "processA";

    const record = new ReceiveRecord(
      receiveRecordId,
      baseUrlHash,
      watchedProcess,
      willMatchActualMessage,
      expectedPattern,
    );
    expect(record.asExpected()).toBe(true);
  });

  it("return false if its actual message doesn't match with expected pattern", () => {
    const expectedPattern = "^some m.+e$";
    const wontMatchActualMessage = "some message that wont match";

    const receiveRecordId = "some-id";
    const baseUrlHash = "some-hash";
    const watchedProcess = "processA";

    const record = new ReceiveRecord(
      receiveRecordId,
      baseUrlHash,
      watchedProcess,
      wontMatchActualMessage,
      expectedPattern,
    );
    expect(record.asExpected()).toBe(false);
  });
});
