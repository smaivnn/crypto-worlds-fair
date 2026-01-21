import { Body, Controller, Post } from '@nestjs/common';
import { ResultRequestDto } from './dto/result-request.dto';
import { AnalyzeResultUseCase } from '../application/analyze-result.use-case';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analyzeResultUseCase: AnalyzeResultUseCase) {}
  @Post('result')
  async postResult(@Body() dto: ResultRequestDto) {
    return await this.analyzeResultUseCase.execute(dto);
  }
}
