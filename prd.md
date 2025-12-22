This PRD is intended to be used directly by AI systems
to generate UI, components, and features.
Follow the philosophy strictly.ㅋ

# 제품개요
## 제품명
- orincode
## 한 줄 정의
- 영미권 사용자를 대상으로 한국의 사주팔자를 '점'이 아닌 '구조 분석 시스템'으로 해석하는 현대적 사주 분석 플랫폼
## 제품 포지션
- 전통 사주/점집/운세 사이트가 아님
- 데이터 기반 사주 분석 플랫폼
- 개인의 타이밍, 성향, 구조를 해석하는 도구

# 문제 정의
## 사용자 관점의 문제
1. 기존 사주 서비스는: 
- 결과 위주(좋다/나쁘다)
- 비과학적, 미신적 인상
- 해외 사용자에게 이해 장벽이 큼
2. AI운세 서비스는:
- 계산 근거 불분명
- 결과 일관성 부족
- "그럴듯한 말 생성기"에 가까움

# 해결하려는 문제
- 사주를 구조화된 분석 체계로 재정의
- 계산은 결정적, 해석은 설명 가능하게
- 신비함은 유지하되 신뢰를 해치지 않음

# 목표 사용자
## Primary
- 사주에 호기심은 있지만 미신은 싫은 사용자
- 자기 이해 / 성향 분석에 관심 있는 글로벌 사용자
- “MBTI보다 깊은 분석”을 원하는 사용자
## Secondary
- 커플 궁합, 관계 분석이 필요한 사용자
- 콘텐츠 소비형이 아닌 분석 결과를 읽는 사용자

# 핵심 가치 제안
- 계산 방식: 코드 기반 결정적 계산
- 해석 방식: 구조, 패턴 중심
- 표현 톤: 차분, 중립, 설명적
- 신비함: 암시적, 과장 없음
- 글로벌 친화성: Four Pillars 개념을 현대적으로 번역

# 핵심 기능
## Free Preview (무료 맛보기)
- 목적: “정확해 보인다”는 인상 제공
- 입력: 생년월일 / 출생 시간(선택) / 지역
- 제공 결과:
    - Core Structure 요약
    - 주요 성향 3가지
    - 주의 패턴 2가지
    - 올해의 타이밍 키워드
## Full Analysis (유료)
- 목적: 자기 이해 도구
- 상세 분석 리포트
    - Core Structure
	- Strengths & Blind Patterns
	- Relationship Style
	- Career & Decision Flow
	- Timing (This Year / Next Year)
- 결과는 Markdown/PDF로 제공
## Compatibility Analysis (유료)
- 두 명의 사주 구조 비교
- 제공 내용: 
    - 관계의 기본 리듬
    - 충돌 지점
    - 조율 포인트
    - 관계 타이밍 해석
목적: 연애, 동업 모두 활용 가능

# 비기능적 요구사항
## 신뢰성
- 동일 입력 → 동일 결과 (결정성 보장)
- AI는 해석 문장 생성만 담당
## 성능
- 결과 생성 3초 이내
- 캐싱 필수
## 확장성
- 추후 API/B2B 분석 기능 구조
- 엔진과 프론트 완전 분리

# 기술 아키텍처
User Input
 → Normalization (timezone, calendar)
 → Four Pillars Calculation Engine
 → Interpretation Key Generator
 → AI Text Renderer
 → Result Cache

## 원칙
- AI가 사주 계산을 하지 않는다
- AI는 설명자 역할

# UX/UI 원칙
## 로그/브랜딩
- 심플, 비어있음, 구조 중심
- 신비함은 여백과 텍스트로 표현
## 톤 앤 매너
- 단정적 표현 금지
- 예언/확정 금지
- "가능성/경향/패턴" 중심

# Screen
1. Landing Page
   - Hero (OrinCode 소개 + 입력 CTA)
   - What OrinCode Is (4~5줄)
   - Input Section
   - Free Preview Result (collapsed)
   - Upgrade CTA

2. Input Page (or Landing embedded)
   - Birth date
   - Birth time (optional)
   - Location
   - Submit

3. Free Preview Result
   - Core Structure Summary
   - Strengths (2)
   - Blind Pattern (1)
   - This Year Keywords

4. Full Analysis Page
   - Sectioned report view
   - Smooth scroll
   - Download PDF

5. Compatibility Page
   - Two-person input
   - Comparison result

### UI Constraints
- No mystical symbols (yin-yang, trigrams, zodiac icons)
- No charts or graphs
- Text-first layout
- Calm, minimal, editorial UI

# 성공 지표
## 초기
- Free to paid 전환율
- Full Analysis 구매율
- 리포트 완독률
## 장기
- 재방문율
- Compatibility 이용 비율
- 자연 유입(SEO) 증가

# 명시적 제외 범위
- 실시간 상담
- 점괘형 질문("될까요?")
- 주식/투자/의료 조언
- 구독 모델 (초기 제외)

# 법적/윤리적 가이드
- Entertainment/Self reflection 목적 명시
- 의료, 재정, 법률 조업 아님
- 결정 책임은 사용자에게 있음

# 제품 철학
- orincode는 답을 주지 않는다. 구조를 보여주고 해석할 수 있게 한다.