"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nest_winston_1 = require("nest-winston");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    const port = process.env.PORT ?? 4000;
    await app.listen(port);
    const logger = app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER);
    logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map