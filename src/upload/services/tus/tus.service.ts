import { Server } from '@tus/server';
import { FileStore } from '@tus/file-store';
import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';

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
    // TODO: set datastore from .env
    this.server = new Server({
      path: '/upload/uploads',
      datastore: new FileStore({ directory: './files' }),
    });
  }
}
