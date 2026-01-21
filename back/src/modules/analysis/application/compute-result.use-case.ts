import { Injectable } from '@nestjs/common';
import { Solar } from 'lunar-javascript';
import * as Astronomy from 'astronomy-engine';
import { emptyScore, ScoreMap } from '../domain/desire.entity';
import { InternalQuestionSet } from '@/modules/question/domain/question-v1.entity';
import { GetQuestionSetUseCase } from '@/modules/question/application/get-question-set.use-case';

export type ComputeResultOutput = {
  version: string;
  locale: 'en' | 'ko';
  primary: { key: keyof ScoreMap; score: number };
  secondary: { key: keyof ScoreMap; score: number };
  confidence: number;
  scores: {
    final: ScoreMap;
    bySource: {
      question: ScoreMap;
      saju: ScoreMap;
      astro: ScoreMap;
    };
  };
};

@Injectable()
export class ComputeResultUseCase {
  constructor(private readonly getQuestionSetUseCase: GetQuestionSetUseCase) {}

  async execute(input: {
    profile: any;
    answers: Record<string, string>;
    version?: string;
    locale?: 'en' | 'ko';
    questionSet: InternalQuestionSet;
  }) {
    const { profile, answers, version, locale, questionSet } = input;

    const questionScore = this.scoreFromAnswers({ set: questionSet, answers });
    const sajuScore = this.scoreFromSaju({ profile });
    const astroScore = this.scoreFromAstro({ profile });

    const finalScore = this.weightedSum({
      question: questionScore,
      saju: sajuScore,
      astro: astroScore,
      wQuestion: 0.4,
      wSaju: 0.4,
      wAstro: 0.2,
    });

    // Top1/Top2 선정
    const keys = Object.keys(emptyScore()) as (keyof ScoreMap)[];
    const ranked = keys
      .map((k) => ({ key: k, score: finalScore[k] ?? 0 }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return String(a.key).localeCompare(String(b.key)); // 동점 안정 정렬
      });

    const primary = ranked[0];
    const secondary = ranked[1] ?? ranked[0];

    // confidence (간단/설명가능): 1위-2위 차이 기반
    // - 0에 가까우면 애매, 1에 가까우면 확실
    const diff = Math.max(0, (primary?.score ?? 0) - (secondary?.score ?? 0));
    const confidence = Math.max(0, Math.min(1, diff / 0.25)); // 0.25 차이면 1로 클램프

    return {
      version,
      locale,
      primary: { key: primary.key, score: primary.score },
      secondary: { key: secondary.key, score: secondary.score },
      confidence,
      scores: {
        final: finalScore,
        bySource: {
          question: questionScore,
          saju: sajuScore,
          astro: astroScore,
        },
      },
    };
  }

  private weightedSum({
    question,
    saju,
    astro,
    wQuestion = 0.4,
    wSaju = 0.4,
    wAstro = 0.2,
  }: {
    question: ScoreMap;
    saju: ScoreMap;
    astro: ScoreMap;
    wQuestion?: number;
    wSaju?: number;
    wAstro?: number;
  }): ScoreMap {
    const result = emptyScore();
    const keys = Object.keys(result) as (keyof ScoreMap)[];

    // 1) 각 스코어의 최대값으로 정규화 (0~1)
    const normalize = (s: ScoreMap) => {
      let max = 0;
      for (const k of keys) max = Math.max(max, s[k] ?? 0);
      if (max === 0) return emptyScore();

      const out = emptyScore();
      for (const k of keys) out[k] = (s[k] ?? 0) / max;
      return out;
    };

    const q = normalize(question);
    const s = normalize(saju);
    const a = normalize(astro);

    // 2) 가중합
    for (const k of keys) {
      result[k] =
        (q[k] ?? 0) * wQuestion + (s[k] ?? 0) * wSaju + (a[k] ?? 0) * wAstro;
    }

    return result;
  }

  private scoreFromAnswers({
    set,
    answers,
  }: {
    set: InternalQuestionSet;
    answers: Record<string, string>;
  }): ScoreMap {
    const score = emptyScore();
    const findChoice = (questionId: string, choiceId: string) => {
      const question = set.questions.find((q) => q.id === questionId);
      if (!question) return null;
      return question.choices.find((c) => c.id === choiceId) ?? null;
    };

    const addDelta = (delta: Record<string, number>) => {
      for (const [desireKey, value] of Object.entries(delta)) {
        (score as ScoreMap)[desireKey] =
          ((score as ScoreMap)[desireKey] ?? 0) + Number(value);
      }
    };

    for (const [questionId, choiceId] of Object.entries(answers ?? {})) {
      const choice = findChoice(questionId, choiceId);
      if (!choice) continue;

      // delta 예시: { ANCHOR: 3, CURATOR: 1 }
      const delta = (choice.score ?? {}) as Record<string, number>;
      addDelta(delta);
    }
    return score;
  }

  private scoreFromSaju({ profile }: { profile: any }): ScoreMap {
    const score = emptyScore();

    // -----------------------------
    // 0) 입력 파싱
    // -----------------------------
    const [year, month, day] = profile.birthDate
      .split('-')
      .map((v) => Number(v));
    if (!year || !month || !day) return score;

    const birthTimeKey = (
      profile?.birthTime as string | undefined
    )?.toLowerCase();

    const hourByBirthTimeMap: Record<string, number> = {
      ja: 23,
      chuk: 1,
      in: 3,
      myo: 5,
      jin: 7,
      sa: 9,
      o: 11,
      mi: 13,
      sin: 15,
      yu: 17,
      sul: 19,
      hae: 21,
    };
    const hour = birthTimeKey ? (hourByBirthTimeMap[birthTimeKey] ?? 12) : 12;
    const minute = 0;
    const second = 0;

    // -----------------------------
    // 1) 간지(연주/월주/일주/시주) 계산
    // -----------------------------
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);
    const eightChar = solar.getLunar().getEightChar();

    // 천간/지지 한 글자 추출
    const yearGan = eightChar.getYearGan().toString(); // 예: "戊"
    const yearZhi = eightChar.getYearZhi().toString(); // 예: "寅"
    const monthGan = eightChar.getMonthGan().toString();
    const monthZhi = eightChar.getMonthZhi().toString();
    const dayGan = eightChar.getDayGan().toString();
    const dayZhi = eightChar.getDayZhi().toString();

    const timeGan = birthTimeKey ? eightChar.getTimeGan().toString() : null;
    const timeZhi = birthTimeKey ? eightChar.getTimeZhi().toString() : null;

    // -----------------------------
    // 2) 천간/지지 -> 오행 카운트 누적
    // -----------------------------
    type Element = 'WOOD' | 'FIRE' | 'EARTH' | 'METAL' | 'WATER';

    const stemToElement: Record<string, Element> = {
      甲: 'WOOD',
      乙: 'WOOD',
      丙: 'FIRE',
      丁: 'FIRE',
      戊: 'EARTH',
      己: 'EARTH',
      庚: 'METAL',
      辛: 'METAL',
      壬: 'WATER',
      癸: 'WATER',
    };

    // 지지의 “주기운(본기)” 기준 매핑(실무에서 흔히 쓰는 기본)
    const branchToElement: Record<string, Element> = {
      寅: 'WOOD',
      卯: 'WOOD',
      巳: 'FIRE',
      午: 'FIRE',
      辰: 'EARTH',
      未: 'EARTH',
      戌: 'EARTH',
      丑: 'EARTH',
      申: 'METAL',
      酉: 'METAL',
      亥: 'WATER',
      子: 'WATER',
    };

    const elementCount: Record<Element, number> = {
      WOOD: 0,
      FIRE: 0,
      EARTH: 0,
      METAL: 0,
      WATER: 0,
    };
    const addStem = (gan: string | null) => {
      if (!gan) return;
      const el = stemToElement[gan];
      if (el) elementCount[el] += 1;
    };

    const addBranch = (zhi: string | null) => {
      if (!zhi) return;
      const el = branchToElement[zhi];
      if (el) elementCount[el] += 1;
    };

    // 4주(연/월/일/시)의 천간+지지 각각 1점씩 합산
    addStem(yearGan);
    addBranch(yearZhi);

    addStem(monthGan);
    addBranch(monthZhi);

    addStem(dayGan);
    addBranch(dayZhi);

    addStem(timeGan);
    addBranch(timeZhi);

    // -----------------------------
    // 3) 오행 카운트 -> 욕망 점수
    // -----------------------------
    const addScore = (delta: Partial<Record<keyof ScoreMap, number>>) => {
      for (const [k, v] of Object.entries(delta)) {
        (score as any)[k] = ((score as any)[k] ?? 0) + Number(v);
      }
    };

    // 오행 1개당 (+1.5, +0.5) 누적
    const w = elementCount.WOOD;
    const f = elementCount.FIRE;
    const e = elementCount.EARTH;
    const mt = elementCount.METAL;
    const wa = elementCount.WATER;

    if (w) addScore({ ASCENDER: 1.5 * w, SEEKER: 0.5 * w });
    if (f) addScore({ WITNESS: 1.5 * f, REBELLION: 0.5 * f });
    if (e) addScore({ ANCHOR: 1.5 * e, GUARDIAN: 0.5 * e });
    if (mt) addScore({ SOVEREIGN: 1.5 * mt, CURATOR: 0.5 * mt });
    if (wa) addScore({ SPECTATOR: 1.5 * wa, NOMAD: 0.5 * wa });

    return score;
  }

  private scoreFromAstro({ profile }: { profile: any }): ScoreMap {
    const score = emptyScore();

    try {
      // -----------------------------
      // 0) 입력 파싱
      // -----------------------------
      const [year, month, day] = String(profile?.birthDate ?? '')
        .split('-')
        .map((v) => Number(v));
      if (!year || !month || !day) return score;

      const birthTimeKey = (
        profile?.birthTime as string | undefined
      )?.toLowerCase();

      // 지지키 -> 대표 시각(대략)
      const hourByBirthTimeMap: Record<string, number> = {
        ja: 23,
        chuk: 1,
        in: 3,
        myo: 5,
        jin: 7,
        sa: 9,
        o: 11,
        mi: 13,
        sin: 15,
        yu: 17,
        sul: 19,
        hae: 21,
      };

      // 시간이 없으면 중립값(정오)
      const hour = birthTimeKey ? (hourByBirthTimeMap[birthTimeKey] ?? 12) : 12;
      const minute = 0;
      const second = 0;

      // -----------------------------
      // 1) AstroTime 생성 (타임존 입력이 없으므로 "고정 정책" 사용)
      // -----------------------------
      const utcLikeDate = new Date(
        Date.UTC(year, month - 1, day, hour, minute, second),
      );
      const time = new Astronomy.AstroTime(utcLikeDate);

      // ✅ 황경(도 단위) 0~360 (지오센트릭 황경)
      const sunLon = Number(Astronomy.SunPosition(time).elon);

      // moon은 birthTime이 있을 때만
      const shouldUseMoon = Boolean(birthTimeKey);
      const moonLon = shouldUseMoon
        ? Number(Astronomy.EclipticGeoMoon(time).lon)
        : null;

      // -----------------------------
      // 2) 황경 -> 별자리 index -> 원소
      // -----------------------------
      type AstroElement = 'FIRE' | 'EARTH' | 'AIR' | 'WATER';

      const toSignIndex = (lon: number) => {
        const x = ((lon % 360) + 360) % 360;
        return Math.floor(x / 30); // 0=Aries, 1=Taurus, ... 11=Pisces
      };

      const signToElement: Record<number, AstroElement> = {
        0: 'FIRE',
        4: 'FIRE',
        8: 'FIRE', // Aries, Leo, Sagittarius
        1: 'EARTH',
        5: 'EARTH',
        9: 'EARTH', // Taurus, Virgo, Capricorn
        2: 'AIR',
        6: 'AIR',
        10: 'AIR', // Gemini, Libra, Aquarius
        3: 'WATER',
        7: 'WATER',
        11: 'WATER', // Cancer, Scorpio, Pisces
      };

      const sunEl = signToElement[toSignIndex(sunLon)];
      const moonEl =
        moonLon != null ? signToElement[toSignIndex(moonLon)] : null;

      // -----------------------------
      // 3) 원소 -> 욕망 점수 매핑
      // -----------------------------
      const addScore = (delta: Partial<Record<keyof ScoreMap, number>>) => {
        for (const [k, v] of Object.entries(delta)) {
          (score as any)[k] = ((score as any)[k] ?? 0) + Number(v);
        }
      };

      /**
       * 매핑 근거(서비스용 일관성):
       * - FIRE  : 자극/돌파 -> SEEKER(강), REBELLION(보조)
       * - EARTH : 안정/유지 -> ANCHOR(강), GUARDIAN(보조)
       * - AIR   : 해석/사회 -> CURATOR(강), WITNESS(보조)
       * - WATER : 친밀/감응 -> MERGER(강), SPECTATOR(보조)
       *
       * Sun은 기본 성향(가중치 1.0)
       * Moon은 정서/친밀 반응(가중치 0.5) — 타임존 부재로 오차 리스크를 반영
       */
      const applyElement = (el: AstroElement, w: number) => {
        switch (el) {
          case 'FIRE':
            addScore({ SEEKER: 1.5 * w, REBELLION: 0.5 * w });
            return;
          case 'EARTH':
            addScore({ ANCHOR: 1.5 * w, GUARDIAN: 0.5 * w });
            return;
          case 'AIR':
            addScore({ CURATOR: 1.5 * w, WITNESS: 0.5 * w });
            return;
          case 'WATER':
            addScore({ MERGER: 1.5 * w, SPECTATOR: 0.5 * w });
            return;
        }
      };

      const sunWeight = 1.0;
      const moonWeight = 0.5;

      applyElement(sunEl, sunWeight);
      if (moonEl) applyElement(moonEl, moonWeight);

      return score;
    } catch (error) {
      console.error('[scoreFromAstro] error:', error);
      throw error;
    }
  }
}
