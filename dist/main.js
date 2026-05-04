"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            /^https?:\/\/localhost:\d+$/,
            /^https?:\/\/172\.16\.\d+\.\d+:\d+$/,
            /^https?:\/\/192\.168\.\d+\.\d+:\d+$/,
            /^https?:\/\/10\.\d+\.\d+\.\d+:\d+$/,
            /^https?:\/\/26\.\d+\.\d+\.\d+:\d+$/,
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map