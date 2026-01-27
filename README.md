# Orincode

Orincode는 영미권 사용자를 대상으로 한국의 사주팔자를 “점”이 아닌 구조 분석으로 해석하는
현대적 사주 분석 플랫폼의 MVP입니다. 프론트엔드는 입력 → 질문 → 결과/공유 흐름을 제공하고,
백엔드는 질문/사주/천문 기반의 결정적 계산을 통해 결과를 생성합니다.

## 현재 구현된 기능
- 프로필 입력(성별, 생년월일, 출생시간/장소)과 설문 흐름
- 질문 세트 로딩 및 답변 기반 분석 결과 생성
- 결과 공유 링크 생성/조회
- 피드백 제출(Formspree 연동)
- 프론트 빌드 결과를 백엔드에서 정적 서빙

## 아키텍처 요약
- 프론트엔드: React + Vite, React Router, React Query, TailwindCSS, Radix UI/shadcn UI
- 백엔드: NestJS 모듈 구조, Postgres 연동, 전역 Validation/응답 포맷터, Winston 로깅
- 분석 로직: 질문 점수 + 사주(lunar-javascript) + 천문(astronomy-engine) 점수를 합산

## 디렉터리 구조
- `front`: React 클라이언트
- `back`: NestJS API 서버
- `server`: 설치/빌드/서빙을 묶은 스크립트

## 로컬 개발
### 의존성 설치
```bash
./server install
```

### 개발 서버 실행
```bash
# backend
cd back
npm run start:dev

# frontend
cd front
npm run dev
```

### 데이터베이스 (Postgres)
```bash
cd back
docker compose up -d
```

### 프로덕션 빌드 & 서빙
```bash
./server build
./server start
```

### 환경 변수
- 프론트엔드: `VITE_API_URL`, `VITE_FORMSPREE_ENDPOINT`
- 백엔드: `PORT`, `DOMAIN`, `PG_DB_*`, `CORS_*`
