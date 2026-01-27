import { PoolClient } from 'pg';
import { FreeResultCopy } from './add-analysis-session.repository';

export type GetAnalysisShareResult = {
  shareId: string;
  expiresAt: Date | null;
  revokedAt: Date | null;
  version: string;
  locale: 'en' | 'ko';
  freeCopy: FreeResultCopy;
};

export abstract class GetAnalysisShareRepository {
  abstract findByShareId(
    shareId: string,
    tx?: PoolClient,
  ): Promise<GetAnalysisShareResult | null>;
}
