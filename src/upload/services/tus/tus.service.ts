import { Server } from '@tus/server';
import { FileStore } from '@tus/file-store';
import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import {
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

		this.server = new Server({
			path: uploadPath,
			datastore: new FileStore({ directory: filesDirectory }),
		});
	}
}
