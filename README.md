# AbkhaziaTrip Platform

Локальный full-stack каркас сервиса подбора туров в Абхазию.

## Что реализовано

- Публичный сайт:
  - главная, туры, отели, курорты, региональные SEO-страницы;
  - контент-хаб (`/blog`) и статьи.
- Продуктовый контур:
  - форма заявки (`/zayavka`);
  - личный кабинет со статусами (`/lichnyy-kabinet`);
  - CRM менеджера (`/admin/leads`) со сменой статусов.
- API:
  - `GET/POST /api/leads`;
  - `PATCH /api/leads/[id]`.
- SEO production-база:
  - `sitemap.xml`, `robots.txt`, структурированные данные на главной;
  - коммерческие и информационные кластеры страниц.
- Юридические страницы:
  - `/oferta`, `/privacy`, `/refunds`.

## Требования

- Node.js `>=20.9.0`
- npm `>=10`

## Запуск в dev

```bash
cd /home/tomas/abkhaziatrip.ru/platform
npm install
npm run dev
```

Открыть: [http://localhost:3001](http://localhost:3001)

## Проверка сборки

```bash
npm run lint
npm run build
```

## Запуск в Docker

```bash
docker compose up --build
```

Открыть: [http://localhost:3001](http://localhost:3001)

## CI/CD: GitHub Actions deploy

Workflow: `.github/workflows/deploy-production.yml`

Что делает:
- обновляет только `abkhaziatrip.ru` на сервере;
- выполняет `git fetch/status/branch/pull --ff-only` в `/opt/abkhaziatrip.ru`;
- перезапускает только второй сервис через `docker compose up -d --build`;
- проверяет, что `abkhazhub.ru` отвечает.

Нужные secrets в GitHub repository:
- `VDS_HOST` (пример: `178.212.12.157`)
- `VDS_USER` (пример: `root`)
- `VDS_PASSWORD`
- `VDS_PORT` (пример: `22`)
