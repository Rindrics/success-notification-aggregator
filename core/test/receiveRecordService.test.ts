import { ReceiveRecord } from "../src/models";
import { ReceiveRecordService } from "../src/services";
import { ReceiveRecordRepository } from "../src/interfaces";

class MockReceiveRecordRepository implements ReceiveRecordRepository {
  private records: ReceiveRecord[];

  constructor(records: ReceiveRecord[]) {
    this.records = records;
  }

  async getByBaseUrlHash(baseUrlHash: string): Promise<ReceiveRecord[] | null> {
    return this.records.filter((record) => record.baseUrlHash === baseUrlHash);
  }
}

describe("ReceiveRecordService", () => {
  it("should check all receive records are as expected", async () => {
    const baseUrlHash = "some-hash";
    const receiveRecords = [
      new ReceiveRecord(
        "1",
        baseUrlHash,
        "endpointA",
        "expected message",
        "expected message",
      ),
      new ReceiveRecord(
        "2",
        baseUrlHash,
        "endpointB",
        "expected message",
        "expected message",
      ),
    ];

    const repository = new MockReceiveRecordRepository(receiveRecords);
    const receiveRecordService = new ReceiveRecordService(repository);

    const result = await receiveRecordService.check(baseUrlHash);

    expect(result).toBe(true);
  });

  it("should return false if any receive record is not as expected", async () => {
    const baseUrlHash = "some-hash";
    const receiveRecords = [
      new ReceiveRecord(
        "1",
        baseUrlHash,
        "endpointA",
        "unexpected message",
        "^expected.+",
      ),
      new ReceiveRecord(
        "2",
        baseUrlHash,
        "endpointB",
        "expected another message",
        "^expected another .+",
      ),
    ];

    const repository = new MockReceiveRecordRepository(receiveRecords);
    const receiveRecordService = new ReceiveRecordService(repository);

    const result = await receiveRecordService.check(baseUrlHash);

    expect(result).toBe(false);
  });

  it("should throw an error if no receive records are found", async () => {
    const baseUrlHash = "some-hash";
    const receiveRecords: ReceiveRecord[] = [];

    const repository = new MockReceiveRecordRepository(receiveRecords);
    const receiveRecordService = new ReceiveRecordService(repository);

    const result = await receiveRecordService.check(baseUrlHash);

    expect(result).toBe(false);
  });
});
