import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { createHash, randomBytes } from 'crypto';
import { PG_POOL } from '@/infra/database/postgres/pg.constants';
import { withTransaction } from '@/infra/database/postgres/pg.tx';
import {
  AddAnalysisSessionRepository,
  FreeResultCopy,
} from '../domain/repositories/add-analysis-session.repository';
import { AddAnalysisShareRepository } from '../domain/repositories/add-analysis-share.repository';
import { FindAnalysisShareRepository } from '../domain/repositories/find-analysis-share.repository';
import { resolveDesireKey } from '../domain/desire.entity';

export type ShareResultInput = {
  profile: {
    gender: string;
    birthDate: string;
    birthTime?: string;
    birthPlace?: string;
  };
  answers: Record<string, string>;
  version?: string;
  locale?: 'en' | 'ko';
  copy: FreeResultCopy;
};

@Injectable()
export class ShareResultUseCase {
  constructor(
    @Inject(PG_POOL) private readonly pool: Pool,
    private readonly addSessionRepo: AddAnalysisSessionRepository,
    private readonly addShareRepo: AddAnalysisShareRepository,
    private readonly findShareRepo: FindAnalysisShareRepository,
  ) {}

  async execute(input: ShareResultInput) {
    // 공유 링크 생성에 필요한 기본 메타 계산
    const version = input.version ?? 'v1';
    const locale = input.locale ?? 'en';
    const shareId = this.generateShareId();
    const expiresAt = this.buildExpiresAt();
    const inputHash = this.createInputHash({
      profile: input.profile,
      answers: input.answers,
      version,
      locale,
    });

    const existingShare =
      await this.findShareRepo.findValidShareByInputHash(inputHash);

    if (existingShare) {
      return {
        shareId: existingShare.shareId,
        shareUrl: this.buildSharePath(existingShare.shareId, locale),
        expiresAt: existingShare.expiresAt,
      };
    }

    // 세션 저장 + 공유 링크 저장을 트랜잭션으로 묶어 정합성 보장
    return withTransaction(this.pool, async (tx) => {
      const sessionResult = await this.addSessionRepo.addSession(
        {
          version,
          locale,
          profile: input.profile,
          answers: input.answers,
          freeCopy: this.normalizeCopyForStorage(input.copy),
          inputHash,
        },
        tx,
      );

      await this.addShareRepo.addShareLink(
        {
          shareId,
          sessionId: sessionResult.id,
          expiresAt,
        },
        tx,
      );

      return {
        shareId,
        shareUrl: this.buildSharePath(shareId, locale),
        expiresAt,
      };
    });
  }

  private buildExpiresAt(): Date | null {
    // env 기반 공유 만료일 계산 (없거나 비정상이면 무기한)
    const days = Number(process.env.SHARE_TTL_DAYS ?? 30);
    if (!Number.isFinite(days) || days <= 0) return null;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  private generateShareId(): string {
    // URL에 넣을 짧은 ID 생성 (base64url)
    return this.base64UrlEncode(randomBytes(9));
  }

  private buildSharePath(shareId: string, locale: 'en' | 'ko'): string {
    return locale === 'ko' ? `/ko/share/${shareId}` : `/share/${shareId}`;
  }

  private createInputHash(payload: {
    profile: {
      gender: string;
      birthDate: string;
      birthTime?: string;
      birthPlace?: string;
    };
    answers: Record<string, string>;
    version: string;
    locale: 'en' | 'ko';
  }): string {
    // 입력을 정규화해 동일 입력이면 동일 해시가 나오도록 보장
    const normalizedAnswers = this.normalizeAnswers(payload.answers);
    const normalizedProfile = {
      gender: payload.profile.gender,
      birthDate: payload.profile.birthDate,
      birthTime: payload.profile.birthTime ?? null,
      birthPlace: payload.profile.birthPlace ?? null,
    };
    const inputKey = JSON.stringify({
      version: payload.version,
      locale: payload.locale,
      profile: normalizedProfile,
      answers: normalizedAnswers,
    });
    return createHash('sha256').update(inputKey).digest('hex');
  }

  private normalizeAnswers(answers: Record<string, string>): string {
    // answers 순서 안정화 (키 정렬)
    return Object.entries(answers ?? {})
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([qid, cid]) => `${qid}=${cid}`)
      .join('|');
  }

  private base64UrlEncode(value: Buffer): string {
    // URL-safe base64 인코딩
    return value
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
  }

  private normalizeCopyForStorage(copy: FreeResultCopy): FreeResultCopy {
    // 공유 저장 시에는 욕망 이름을 키(영문)로 정규화해 저장
    const mainKey = resolveDesireKey(copy.summaryCard.mainDesire);
    const subKey = resolveDesireKey(copy.summaryCard.subDesire);
    return {
      ...copy,
      summaryCard: {
        ...copy.summaryCard,
        mainDesire: mainKey ?? copy.summaryCard.mainDesire,
        subDesire: subKey ?? copy.summaryCard.subDesire,
      },
    };
  }
}
