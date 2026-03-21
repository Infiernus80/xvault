import { Server } from '@tus/server';
import { FileStore } from '@tus/file-store';
import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import {
	getTusAllowedOrigins,
	getTusFilesDirectory,
	getTusUploadPath,
} from '../../config/tus.config';

@Injectable()
export class TusService {
	private server: Server;

	constructor() {
		this._configTus();
	}

	public handleTus(request: Request, response: Response) {
		return this.server.handle(request, response);
	}

	private _configTus() {
		const uploadPath = getTusUploadPath();
		const filesDirectory = getTusFilesDirectory();
		const allowedOrigins = getTusAllowedOrigins();

		this.server = new Server({
			path: uploadPath,
			relativeLocation: true,
			respectForwardedHeaders: true,
			allowedOrigins,
			datastore: new FileStore({ directory: filesDirectory }),
		});
	}
}
