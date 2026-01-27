import { PoolClient } from 'pg';

export type AddAnalysisShareInput = {
  shareId: string;
  sessionId: string;
  expiresAt: Date | null;
};

export abstract class AddAnalysisShareRepository {
  abstract addShareLink(
    input: AddAnalysisShareInput,
    tx?: PoolClient,
  ): Promise<void>;
}
