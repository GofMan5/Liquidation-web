# Liquidation

Веб-приложение для продажи цифровых товаров и подписок.

## Технологии

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Radix UI

### Backend
- NestJS 11
- Drizzle ORM
- SQLite (better-sqlite3)
- Winston

### Архитектура
- Frontend: Feature-Sliced Design (FSD)
- Backend: Clean Architecture

## Установка

```bash
npm install
cd client && npm install
cd ../server && npm install
```

## Запуск

```bash
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:4000

## Структура

```
client/src/
├── app/           # Next.js роуты
├── entities/      # Бизнес-сущности
├── features/      # Фичи
├── shared/        # UI и утилиты
├── views/         # Страницы
└── widgets/       # Виджеты

server/src/
├── application/   # Use cases
├── domain/        # Entities
├── infrastructure/# DB, Logger
└── presentation/  # Controllers
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Frontend + Backend |
| `npm run client` | Только frontend |
| `npm run server` | Только backend |
| `npm run build` | Сборка |

## Переменные окружения

```env
# server/.env
PORT=4000
LOG_LEVEL=http
```

## Лицензия

MIT
