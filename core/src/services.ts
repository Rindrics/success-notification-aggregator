import { ReceiveRecordRepository } from "interfaces";

export class ReceiveRecordService {
  repository: ReceiveRecordRepository;

  constructor(repository: ReceiveRecordRepository) {
    this.repository = repository;
  }

  async check(
    baseUrlHash: string,
    expectedEndpoints: string[],
  ): Promise<string[]> {
    const receiveRecords = await this.repository.getByBaseUrlHash(baseUrlHash);
    if (!receiveRecords || receiveRecords.length === 0) {
      throw new Error(
        `ReceiveRecord with base URL hash ${baseUrlHash} not found`,
      );
    }

    const receivedEndpoints = receiveRecords.map((record) => record.endpoint);
    const missingEndpoints = expectedEndpoints.filter(
      (service) => !receivedEndpoints.includes(service),
    );
    const failedEndpoints = receiveRecords
      .filter((record) => !record.asExpected())
      .map((record) => record.endpoint);

    return [...missingEndpoints, ...failedEndpoints];
  }
}
