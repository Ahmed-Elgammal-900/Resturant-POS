"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const serverlessExpress = require("aws-serverless-express");
const cookieParser = require("cookie-parser");
let cachedServer;
async function bootstrapServer() {
    if (!cachedServer) {
        const expressApp = express();
        expressApp.use(cookieParser());
        const adapter = new platform_express_1.ExpressAdapter(expressApp);
        const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
        app.enableCors({ origin: process.env.ORIGIN, credentials: true });
        await app.init();
        const server = serverlessExpress.createServer(expressApp);
        cachedServer = (event, context, callback) => {
            return serverlessExpress.proxy(server, event, context);
        };
    }
    return cachedServer;
}
const handler = async (event, context, callback) => {
    const server = await bootstrapServer();
    return server(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=index.js.map