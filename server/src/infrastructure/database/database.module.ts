import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Global()
@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const dbPath = configService.get<string>('database.path', 'sqlite.db');
                const sqlite = new Database(dbPath);
                return drizzle(sqlite, { schema });
            },
        },
    ],
    exports: [DATABASE_CONNECTION],
})
export class DatabaseModule { }
