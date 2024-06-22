import { ReceiveRecord } from "../src/models";


describe("ReceiveRecord", () => {
  it("should create a valid ReceiveRecord", () => {
    const receiveRecordId = "some-id"
    const actualMessage = "some message";
    const expectedPattern = "expected pattern";
    const endpoint = "another-id"

    const record = new ReceiveRecord(receiveRecordId, actualMessage, expectedPattern, endpoint);

    expect(record.receiveRecordId).toBe(receiveRecordId);
    expect(record.actualMessage).toBe(actualMessage);
    expect(record.expectedPattern).toBe(expectedPattern);
    expect(record.endpoint).toBe(endpoint);
  });
});
