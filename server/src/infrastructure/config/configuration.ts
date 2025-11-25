export default () => ({
  port: parseInt(process.env.PORT ?? '4000', 10),
  database: {
    path: process.env.DATABASE_PATH || 'sqlite.db',
  },
  cors: {
    origins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  },
  logging: {
    level: process.env.LOG_LEVEL || 'http',
  },
});
