import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../../.env') });


import express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { init } from './init';
import { getIndexRouter } from './routes';

let server: Server;

(async () => {
    await init();
    const port = 3000;
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use('/', await getIndexRouter());
    server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

    process.on('SIGINT', stopp);
    process.on('SIGTERM', stopp);
})().catch(console.log);

function stopp() {
    server.close();
}

