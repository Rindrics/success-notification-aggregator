import { ReceiveRecordRepository } from "interfaces";

export class ReceiveRecordService {
  repository: ReceiveRecordRepository;

  constructor(repository: ReceiveRecordRepository) {
    this.repository = repository;
  }

  async check(
    baseUrlHash: string,
    watchedProcesses: string[],
  ): Promise<string[]> {
    const receiveRecords = await this.repository.getByBaseUrlHash(baseUrlHash);
    if (!receiveRecords || receiveRecords.length === 0) {
      throw new Error(
        `ReceiveRecord with base URL hash ${baseUrlHash} not found`,
      );
    }

    const receivedWatchedProcesses = receiveRecords.map(
      (record) => record.watchedProcess,
    );
    const missingWathedProcesses = watchedProcesses.filter(
      (watchedProcess) => !receivedWatchedProcesses.includes(watchedProcess),
    );
    const failedWathedProcesses = receiveRecords
      .filter((record) => !record.asExpected())
      .map((record) => record.watchedProcess);

    return [...missingWathedProcesses, ...failedWathedProcesses];
  }
}
