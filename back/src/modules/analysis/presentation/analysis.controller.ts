import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResultRequestDto } from './dto/result-request.dto';
import { AnalyseResultUseCase } from '../application/analyse-result.use-case';
import { ShareResultUseCase } from '../application/share-result.use-case';
import { ShareRequestDto } from './dto/share-request.dto';
import { GetShareResultUseCase } from '../application/get-share-result.use-case';

@Controller('analysis')
export class AnalysisController {
  constructor(
    private readonly analyseResultUseCase: AnalyseResultUseCase,
    private readonly shareResultUseCase: ShareResultUseCase,
    private readonly getShareResultUseCase: GetShareResultUseCase,
  ) {}
  @Post('result')
  async postResult(@Body() dto: ResultRequestDto) {
    return await this.analyseResultUseCase.execute(dto);
  }

  @Post('share')
  async postShare(@Body() dto: ShareRequestDto) {
    return await this.shareResultUseCase.execute(dto);
  }

  @Get('share/:shareId')
  async getShare(@Param('shareId') shareId: string) {
    return await this.getShareResultUseCase.execute(shareId);
  }
}
