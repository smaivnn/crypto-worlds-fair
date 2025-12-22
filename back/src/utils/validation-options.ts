import { ValidationPipeOptions } from '@nestjs/common';

const validationOptions: ValidationPipeOptions = {
  transform: true, // 요청값을 자동으로 DTO 타입에 맞게 변환
  whitelist: true, // DTO에 정의되지 않은 속성 제거
  forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 에러 발생
  transformOptions: { enableImplicitConversion: true }, // string <-> number 자동 변환
};

export default validationOptions;
