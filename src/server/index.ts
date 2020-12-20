import express from 'express';
import { Server } from 'http';

import { indexRouter } from './routes';

let server: Server;

function main() {
    const port = 3000;
    const app = express();

    app.use('/', indexRouter);
    server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

    process.on('SIGINT', stopp);
    process.on('SIGTERM', stopp);
}

function stopp() {
    server.close();
}

main();
