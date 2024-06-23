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
    const usedEndpoints = ["endpointA", "endpointB"];
    const receiveRecords = [
      new ReceiveRecord(
        "1",
        baseUrlHash,
        usedEndpoints[0],
        "expected message",
        "expected message",
      ),
      new ReceiveRecord(
        "2",
        baseUrlHash,
        usedEndpoints[1],
        "expected message",
        "expected message",
      ),
    ];

    const repository = new MockReceiveRecordRepository(receiveRecords);
    const receiveRecordService = new ReceiveRecordService(repository);

    const result = await receiveRecordService.check(baseUrlHash, usedEndpoints);

    expect(result).toStrictEqual([]);
  });

  it("should return false if any receive record have not been arrived", async () => {
    const baseUrlHash = "some-hash";
    const usedEndpoints = ["endpointA", "endpointB"];
    const receiveRecords = [
      new ReceiveRecord(
        "1",
        baseUrlHash,
        usedEndpoints[0],
        "expected message",
        "^expected.+",
      ),
    ];

    const repository = new MockReceiveRecordRepository(receiveRecords);
    const receiveRecordService = new ReceiveRecordService(repository);

    const result = await receiveRecordService.check(baseUrlHash, usedEndpoints);

    expect(result).toStrictEqual(["endpointB"]);
  });

  it("should return false if any receive record is not as expected", async () => {
    const baseUrlHash = "some-hash";
    const usedEndpoints = ["endpointA", "endpointB"];
    const receiveRecords = [
      new ReceiveRecord(
        "1",
        baseUrlHash,
        usedEndpoints[0],
        "unexpected message",
        "^expected.+",
      ),
      new ReceiveRecord(
        "2",
        baseUrlHash,
        usedEndpoints[1],
        "expected another message",
        "^expected another .+",
      ),
    ];

    const repository = new MockReceiveRecordRepository(receiveRecords);
    const receiveRecordService = new ReceiveRecordService(repository);

    const result = await receiveRecordService.check(baseUrlHash, usedEndpoints);

    expect(result).toStrictEqual(["endpointA"]);
  });

  it("should throw an error if no receive records are found", async () => {
    const baseUrlHash = "some-hash";
    const usedEndpoints = ["endpointA", "endpointB"];
    const receiveRecords: ReceiveRecord[] = [];

    const repository = new MockReceiveRecordRepository(receiveRecords);
    const receiveRecordService = new ReceiveRecordService(repository);

    await expect(
      receiveRecordService.check(baseUrlHash, usedEndpoints),
    ).rejects.toThrow(
      `ReceiveRecord with base URL hash ${baseUrlHash} not found`,
    );
  });
});
