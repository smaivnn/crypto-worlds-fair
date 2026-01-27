# Frontend Code Patterns

## 라우팅/페이지 구조
- `App.tsx`에서 React Router로 페이지 라우팅 구성
- `pages/<feature>`에 페이지 진입 컴포넌트와 View 분리
- 레이아웃은 `components/layout/Layout`에서 공통 처리

## View 분리 패턴
- 컨테이너 컴포넌트는 데이터/상태/핸들러 준비
- View 컴포넌트는 렌더링 책임에 집중
- 예시: `pages/questions/index.tsx` + `QuestionPageView.tsx`

## API + React Query 패턴
- `api/*.api.ts`에서 Axios 기반 호출과 타입 정의
- `queries/*.queries.ts`에서 `useQuery`/`useMutation` 래핑
- Query Key는 모듈별 상수로 관리

## 로컬 상태 관리 (Zustand)
- 전역 UI 상태는 `store/*Store.ts`에 정의
- `useModalStore`, `useLoadingStore` 등 단순한 액션/상태 모델 유지

## 폼/검증 패턴
- `react-hook-form` + `zodResolver`로 입력 검증
- 입력 UI는 section/view로 나누고, `useProfileForm`에서 상태와 옵션 구성
- 기본값은 로컬 스토리지에서 복원

## i18n 경로 기반 패턴
- 기본 언어는 `/`(en), 한국어는 `/ko` prefix
- `useI18n` 훅이 경로 기반 locale 결정/변경
- 카피는 `i18n/*.copy.ts`에서 관리하고 페이지에서 병합

## UI/스타일링 패턴
- TailwindCSS + `cn` 유틸로 클래스 조합
- Radix UI 기반 컴포넌트(`components/ui`)와 shadcn 스타일 활용
- 전역 오류 오버레이(`main.tsx`)로 런타임 에러 표시
