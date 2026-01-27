import { PoolClient } from 'pg';

export type FreeResultCopy = {
  summaryCard: {
    mainDesire: string;
    subDesire: string;
    userQuote: string;
    engineLine: string;
    styleLine: string;
    tags: string[];
  };
  structure: { lines: string[] };
  trigger: { lines: string[] };
  illusion: { lines: string[] };
  intimacy: { lines: string[] };
  paywallCTA: string;
};

export type AddAnalysisSessionInput = {
  version: string;
  locale: 'en' | 'ko';
  profile: Record<string, unknown>;
  answers: Record<string, string>;
  freeCopy: FreeResultCopy;
  inputHash?: string;
};

export type AddAnalysisSessionResult = {
  id: string;
};

export abstract class AddAnalysisSessionRepository {
  abstract addSession(
    input: AddAnalysisSessionInput,
    tx?: PoolClient,
  ): Promise<AddAnalysisSessionResult>;
}
