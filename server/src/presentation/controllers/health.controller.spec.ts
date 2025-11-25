import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { DATABASE_CONNECTION } from '../../infrastructure/database/database.module';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: DATABASE_CONNECTION,
          useValue: {}, // Mock database connection
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  describe('check', () => {
    it('should return status ok with timestamp and uptime', () => {
      const result = controller.check();

      expect(result.status).toBe('ok');
      expect(result.timestamp).toBeDefined();
      expect(typeof result.uptime).toBe('number');
    });
  });

  describe('readiness', () => {
    it('should return ready status when database is connected', () => {
      const result = controller.readiness();

      expect(result.status).toBe('ready');
      expect(result.timestamp).toBeDefined();
      expect(result.checks.database).toBe('ok');
    });
  });

  describe('readiness with no database', () => {
    let controllerWithoutDb: HealthController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [HealthController],
        providers: [
          {
            provide: DATABASE_CONNECTION,
            useValue: null,
          },
        ],
      }).compile();

      controllerWithoutDb = module.get<HealthController>(HealthController);
    });

    it('should return not_ready status when database is not connected', () => {
      const result = controllerWithoutDb.readiness();

      expect(result.status).toBe('not_ready');
      expect(result.checks.database).toBe('error');
    });
  });
});
