import { ReceiveRecord } from "models";

export interface ReceiveRecordRepository {
  getByBaseUrlHash(baseUrlHash: string): Promise<ReceiveRecord[] | null>;
}
