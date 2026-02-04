import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { TusService } from './services/tus/tus.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly tusService: TusService) {}
    
    @All('*')
    public tus(@Req() request: Request, @Res() response: Response) {
        this.tusService.handleTus()(request, response);
    }
}
