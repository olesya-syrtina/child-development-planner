# Child Development Planner

Веб-приложение для родителей, которое помогает составить индивидуальный план развивающих занятий для ребёнка на основе его возраста и освоенных навыков.

## О проекте

Пользователь указывает возраст ребёнка и отмечает навыки, которые ребёнок уже освоил. На основе выбранных данных приложение определяет навыки, которым необходимо уделить дополнительное внимание, и формирует план занятий с подходящими упражнениями.

## MVP

создание профиля ребёнка;

отображение навыков, соответствующих возрасту;

разделение навыков по категориям развития;

отметку освоенных навыков;

формирование индивидуального плана занятий.

# Технологии

## Frontend

Vue 3

TypeScript

Vite

Bootstrap

## Backend

Node.js

Express

## Database

PostgreSQL

Prisma ORM

## Test

Vitest

# Запуск

1. Клонировать репозиторий

```bash
git clone https://github.com/olesya-syrtina/child-development-planner.git
cd child-development-planner
```

2. Установить зависимости

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd ../server
npm install
```

3. Настроить PostgreSQL

База данных:

```text
child_development_planner
```

Настроить переменную окружения:

В папке server создать файл .env

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/child_development_planner"
```

4. После настройки базы данных Prisma Client должен быть сгенерирован командой:

```bash
cd server
npx prisma generate
```

5. Запуск из корня проекта

```bash
npm run dev
```

Команда одновременно запускает frontend и backend.

# ESLint и Prettier

Команда для проверки:

```bash
cd client
npm run lint
```

Форматирование кода:

```bash
cd client
npm run format
```

# Test

```bash
cd client
npm test
```
