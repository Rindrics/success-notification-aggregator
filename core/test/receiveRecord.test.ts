import { ReceiveRecord } from "../src/models";


describe("ReceiveRecord", () => {
  it("should create a valid ReceiveRecord", () => {
    const id = "some-id"
    const actualMessage = "some message";
    const expectedPattern = "expected pattern";

    const record = new ReceiveRecord(id, actualMessage, expectedPattern);

    expect(record.id).toBe(id);
    expect(record.actualMessage).toBe(actualMessage);
    expect(record.expectedPattern).toBe(expectedPattern);
  });
});
