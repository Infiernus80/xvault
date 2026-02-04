import { Server } from '@tus/server';
import { FileStore } from '@tus/file-store';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TusService {
    private server: Server;

    constructor() {
        this._configTus();
    }

    public handleTus() {
        return this.server.handle
    }

    private _configTus() {
        // TODO: set datastore from .env
        this.server = new Server({
            path: '/uploads',
            datastore: new FileStore({ directory: './files' })
        })
    }

}
