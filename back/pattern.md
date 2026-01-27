# Backend Code Patterns

## 모듈 구조 (도메인 중심)
- `modules/<feature>/presentation`: Controller + DTO로 요청/응답 경계 정의
- `modules/<feature>/application`: `*.use-case.ts` 단위 시나리오 구성
- `modules/<feature>/domain`: 엔티티/값 객체, 리포지토리 인터페이스, 도메인 데이터
- `modules/<feature>/infrastructure`: DB/외부 연동, 리포지토리 구현체
- 모듈별 의존성 연결은 `*.module.ts`에서 `useClass`로 바인딩

## Use Case 중심의 시나리오 패턴
- `execute()` 메서드 중심으로 입력/출력 타입을 명시
- 계산/조합 흐름을 담당하고, 규칙/데이터는 도메인으로 위임
- 예시: 결과 분석(`analysis/application/analyse-result.use-case.ts`)

## 리포지토리 인터페이스 + DI 바인딩
- 도메인에 추상 리포지토리 정의 → 인프라에서 구현체 제공
- `analysis.module.ts`에서 `provide` + `useClass`로 주입
- 저장소가 바뀌어도 도메인/유스케이스 코드는 유지

## DTO + ValidationPipe 패턴
- `class-validator`/`class-transformer`로 입력 검증
- `ValidationPipe`를 전역 설정하여 자동 변환/화이트리스트 적용
- 중첩 DTO는 `@ValidateNested` + `@Type` 사용

## 공통 응답/에러 포맷
- `ResponseInterceptor`가 `{ success, statusCode, data }` 형태로 응답 래핑
- `HttpExceptionFilter`가 예외를 표준 에러 포맷으로 정규화
- 로깅은 커스텀 `LoggerService`(Winston)로 통일

## 인프라/설정 패턴
- `registerAs` 기반 설정 모듈 + `ConfigService`로 환경 변수 관리
- `InfraModule`에서 DB/RateLimiter 모듈을 전역 제공
- Postgres 풀과 트랜잭션 헬퍼(`pg.tx.ts`)를 공통 유틸로 사용

## 프론트 정적 서빙 통합
- `server build`로 `front/dist`를 `back/public`에 복사
- `serveFrontend` 유틸로 `/api` 외 요청은 정적 파일로 처리
