import { ReceiveRecord } from "models";
import { ReceiveRecordRepository } from "interfaces";

export class ReceiveRecordService {
  repository: ReceiveRecordRepository;

  constructor(repository: ReceiveRecordRepository) {
    this.repository = repository;
  }

  async check(baseUrlHash: string): Promise<boolean> {
    const receiveRecords = await this.repository.getByBaseUrlHash(baseUrlHash);
    if (!receiveRecords || receiveRecords.length === 0) {
      return false;
    }
    return receiveRecords.every((receiveRecord) => receiveRecord.asExpected());
  }
}
