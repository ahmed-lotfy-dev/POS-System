"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.enableCors({
        credentials: true,
        origin: process.env.APP_HOME,
        methods: 'GET, POST, PUT, DELETE,UPDATE, OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map