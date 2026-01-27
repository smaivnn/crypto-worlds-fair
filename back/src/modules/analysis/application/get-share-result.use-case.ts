import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { BuildBdsmTendencyUseCase } from './build-bdsm-tendency.use-case';
import { GetAnalysisShareRepository } from '../domain/repositories/get-analysis-share.repository';
import { getDesireLabel, resolveDesireKey } from '../domain/desire.entity';

@Injectable()
export class GetShareResultUseCase {
  constructor(
    private readonly getAnalysisShareRepo: GetAnalysisShareRepository,
    private readonly buildBdsmTendencyUseCase: BuildBdsmTendencyUseCase,
  ) {}

  async execute(shareId: string) {
    const share = await this.getAnalysisShareRepo.findByShareId(shareId);
    if (!share) {
      throw new NotFoundException('Share not found');
    }

    if (share.revokedAt) {
      throw new GoneException('Share revoked');
    }

    if (share.expiresAt && share.expiresAt.getTime() < Date.now()) {
      throw new GoneException('Share expired');
    }

    const primaryKey = resolveDesireKey(
      share.freeCopy?.summaryCard?.mainDesire ?? '',
    );
    const secondaryKey = resolveDesireKey(
      share.freeCopy?.summaryCard?.subDesire ?? '',
    );

    const tendency =
      primaryKey && secondaryKey
        ? this.buildBdsmTendencyUseCase.execute({
            primary: primaryKey,
            secondary: secondaryKey,
            locale: share.locale,
            access: 'free',
          })
        : null;

    return {
      shareId: share.shareId,
      expiresAt: share.expiresAt,
      version: share.version,
      locale: share.locale,
      copy: this.applyLocaleToCopy(share.freeCopy, share.locale),
      tendency,
    };
  }

  private applyLocaleToCopy(copy: any, locale: 'en' | 'ko') {
    if (!copy?.summaryCard) return copy;
    const mainKey = resolveDesireKey(copy.summaryCard.mainDesire ?? '');
    const subKey = resolveDesireKey(copy.summaryCard.subDesire ?? '');
    return {
      ...copy,
      summaryCard: {
        ...copy.summaryCard,
        mainDesire: mainKey ? getDesireLabel(mainKey, locale) : copy.summaryCard.mainDesire,
        subDesire: subKey ? getDesireLabel(subKey, locale) : copy.summaryCard.subDesire,
      },
    };
  }
}
