import { Module } from '@nestjs/common';
import { TusService } from './services/tus/tus.service';
import { UploadController } from './upload.controller';

@Module({
  providers: [TusService],
  controllers: [UploadController]
})
export class UploadModule {}
