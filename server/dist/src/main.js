"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Pos-System Backend Server ')
        .setDescription('Pos system backend made with nestjs for pos system vite app')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        credentials: true,
        origin: ['https://pos-system-f.ahmedlotfy.dev', 'http://localhost:3000'],
        allowedHeaders: '*',
    });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map