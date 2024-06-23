import { ReceiveRecord } from "models";
import { ReceiveRecordRepository } from "interfaces";

export class ReceiveRecordService {
  repository: ReceiveRecordRepository;

  constructor(repository: ReceiveRecordRepository) {
    this.repository = repository;
  }

  async check(baseUrlHash: string): Promise<string[]> {
    const receiveRecords = await this.repository.getByBaseUrlHash(baseUrlHash);
    if (!receiveRecords || receiveRecords.length === 0) {
      throw new Error(
        `ReceiveRecord with base URL hash ${baseUrlHash} not found`,
      );
    }

    const failedEndpoints = receiveRecords
      .filter((record) => !record.asExpected())
      .map((record) => record.endpoint);

    return failedEndpoints;
  }
}
