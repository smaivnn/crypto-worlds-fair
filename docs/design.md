# 도화지 디자인 가이드 (MVP)

## 1) 디자인 방향
- 키워드: **Canvas-first / Minimal / Web3 accent**
- 기본 톤: 밝은 바탕 + 높은 가독성
- 인상: 창작 참여의 가벼움 + 시즌 이벤트의 몰입감

## 2) 컬러 시스템 (초안)

### Base
- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Text Primary: `#0F172A`
- Text Secondary: `#475569`
- Border: `#E2E8F0`

### Brand / Accent (Solana mood)
- Purple: `#8B5CF6`
- Mint: `#2DD4BF`
- Gradient: `linear-gradient(135deg, #8B5CF6 0%, #2DD4BF 100%)`

### Status
- Success: `#22C55E`
- Warning: `#F59E0B`
- Error: `#EF4444`

## 3) 타이포그래피
- 제목: Pretendard/SUIT 계열 Bold
- 본문: Pretendard/SUIT Regular
- 원칙: 작은 설명 텍스트를 줄이고, 상태값(남은 획/종료시간)을 크게

## 4) 주요 UI 스타일
- 캔버스: 흰 바탕 + 은은한 그리드(픽셀 감각)
- 브러시 표시: 현재 획 위치를 점/얇은 선으로 프리뷰
- 카드: 라운드 12px, 얕은 그림자, 경계선 명확
- 버튼:
  - Primary: 솔라나 그라데이션
  - Secondary: 흰 배경 + 보더
  - Disabled: 저채도 회색

## 5) 페이지별 디자인 우선순위
- 랜딩: 실시간 메인 도화지 미리보기 노출이 최우선
- 메인/시즌 캔버스: 조작 요소 최소화(그리기 경험 방해 금지)
- 마이페이지: 활동 타임라인 + 보상 상태를 한눈에

## 6) 인터랙션 원칙
- 획 제한 관련 정보는 항상 상단 고정 노출
- 획 소진/시즌 종료는 즉시 토스트 + 상태 배지로 피드백
- 실패 메시지는 원인 중심(예: “이미 1획을 사용했습니다”)

## 7) 반응형 기준
- Desktop 우선, Tablet 대응, Mobile은 핵심 흐름 유지
- 모바일에서는 캔버스 비율 유지 + 주변 UI 접기

