import { All, Controller, Get, Header, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { TusService } from './services/tus/tus.service';
import { renderUppyMvcExamplePage } from './docs/uppy-mvc-example.page';

@Controller('upload')
export class UploadController {
  constructor(private readonly tusService: TusService) {}

  @Get('example')
  @Header('Content-Type', 'text/html; charset=utf-8')
  public uppyExample(): string {
    return renderUppyMvcExamplePage('/upload/uploads');
  }

  @All('*')
  public tus(@Req() request: Request, @Res() response: Response) {
    return this.tusService.handleTus(request, response);
  }
}
