"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston = __importStar(require("winston"));
const { combine, timestamp, printf, colorize, errors } = winston.format;
const consoleFormat = printf((info) => {
    const { level, message, timestamp, context, stack, method, url, statusCode, duration } = info;
    const ctx = context ? `[${context}]` : '';
    const stackTrace = stack ? `\n${stack}` : '';
    if (method && url && typeof statusCode === 'number') {
        const statusColor = statusCode >= 500 ? '\x1b[31m' : statusCode >= 400 ? '\x1b[33m' : '\x1b[32m';
        const reset = '\x1b[0m';
        return `${timestamp} ${level} ${ctx} ${method} ${url} ${statusColor}${statusCode}${reset} ${duration}ms`;
    }
    return `${timestamp} ${level} ${ctx} ${message}${stackTrace}`;
});
const fileFormat = printf(({ level, message, timestamp, context, stack, ...meta }) => {
    return JSON.stringify({
        timestamp,
        level,
        context,
        message,
        stack,
        ...meta,
    });
});
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'cyan',
        verbose: 'blue',
        debug: 'magenta',
    },
};
winston.addColors(customLevels.colors);
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot({
                levels: customLevels.levels,
                level: process.env.LOG_LEVEL || 'http',
                transports: [
                    new winston.transports.Console({
                        format: combine(colorize({ all: true }), timestamp({ format: 'HH:mm:ss' }), errors({ stack: true }), consoleFormat),
                    }),
                    new winston.transports.File({
                        filename: 'logs/error.log',
                        level: 'error',
                        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), fileFormat),
                        maxsize: 5242880,
                        maxFiles: 5,
                    }),
                    new winston.transports.File({
                        filename: 'logs/combined.log',
                        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), fileFormat),
                        maxsize: 5242880,
                        maxFiles: 5,
                    }),
                ],
            }),
        ],
        exports: [nest_winston_1.WinstonModule],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map