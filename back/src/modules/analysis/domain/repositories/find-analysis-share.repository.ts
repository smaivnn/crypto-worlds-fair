import { PoolClient } from 'pg';

export type FindAnalysisShareResult = {
  shareId: string;
  expiresAt: Date | null;
};

export abstract class FindAnalysisShareRepository {
  abstract findValidShareByInputHash(
    inputHash: string,
    tx?: PoolClient,
  ): Promise<FindAnalysisShareResult | null>;
}
