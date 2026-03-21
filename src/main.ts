import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import { AppModule } from './app.module';
import { TusService } from './upload/services/tus/tus.service';
import { getTusUploadPath } from './upload/config/tus.config';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const tusService = app.get(TusService);
	const tusUploadPath = getTusUploadPath();

	app.use(tusUploadPath, (request: Request, response: Response) =>
		tusService.handleTus(request, response),
	);

	await app.listen(process.env.PORT ?? 3003);
}
void bootstrap();
