# Liquidation

Веб-приложение для продажи цифровых товаров и подписок.

## Стек технологий

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn/UI
- Zustand

**Backend:**
- NestJS
- Drizzle ORM
- SQLite
- Winston (логирование)

**Архитектура:** Feature-Sliced Design (FSD)

## Быстрый старт

```bash
# Установка зависимостей
npm install
cd client && npm install
cd ../server && npm install
cd ..

# Запуск (frontend + backend)
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Структура проекта

```
├── client/                 # Next.js frontend
│   └── src/
│       ├── app/           # Роуты и страницы
│       ├── entities/      # Бизнес-сущности (product, user, cart)
│       ├── features/      # Фичи (auth, checkout, cart)
│       ├── shared/        # UI компоненты и утилиты
│       ├── views/         # Страницы (home, profile, products)
│       └── widgets/       # Виджеты (header, footer)
│
├── server/                 # NestJS backend
│   └── src/
│       ├── application/   # Use cases
│       ├── domain/        # Entities
│       ├── infrastructure/# Database, Logger
│       └── presentation/  # Controllers
│
└── package.json           # Корневой package.json
```

## Доступные страницы

| Путь | Описание |
|------|----------|
| `/` | Главная |
| `/products` | Каталог товаров |
| `/products/[id]` | Страница товара |
| `/profile` | Личный кабинет |
| `/admin` | Админ панель |
| `/faq` | FAQ |
| `/support` | Поддержка |
| `/terms` | Условия использования |
| `/privacy` | Политика конфиденциальности |
| `/test` | Тестовая страница (dev) |

## Скрипты

```bash
npm run dev      # Запуск frontend + backend
npm run client   # Только frontend
npm run server   # Только backend
npm run build    # Сборка проекта
```

## Интеграция с API

Моки данных находятся в:
- `client/src/entities/product/lib/mock-data.ts` — товары
- `client/src/entities/user/lib/mock-data.ts` — пользователь, устройства

Сервисы для замены на реальное API:
- `client/src/entities/product/api/product-service.ts`
- `client/src/features/auth/model/auth-provider.tsx`
- `client/src/features/checkout/model/deposit-store.ts`

## Переменные окружения

**Server (.env):**
```
PORT=4000
LOG_LEVEL=http
```

## Лицензия

MIT
