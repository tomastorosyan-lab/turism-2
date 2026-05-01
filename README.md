# AbkhaziaTrip Platform

Локальный full-stack каркас сервиса подбора туров в Абхазию.

## Каноника (постоянно)

- **Один источник правды в Git:** [tomastorosyan-lab/turism-2](https://github.com/tomastorosyan-lab/turism-2), ветка **`main`**.
- **Локальная разработка** — содержимое этого репозитория (корень = Next.js-платформа); после `git push origin main` на GitHub должен быть тот же код, что и у вас локально.
- **Продакшен** — рабочая копия на сервере **`/opt/abkhaziatrip.ru`**, обновляется только через **`.github/workflows/deploy-production.yml`** (SSH + `git pull` + `docker compose`). Путь **`/opt/turism`** и workflow **`deploy-prod.yml`** из старой схемы **не используются** — не возвращайте их, чтобы снова не разъехались Git и прод.
- **abkhazhub.ru** workflow только проверяет доступность и фрагменты nginx-конфига, каталоги hub не трогает.

```bash
git remote add origin https://github.com/tomastorosyan-lab/turism-2.git
# уже добавлен — проверка: git remote -v
git push -u origin main
```

## Бренд и SEO

- **Бренд:** AbkhaziaTrip. **Канонический сайт:** https://abkhaziatrip.ru/
- В шапке, футере, метаданных и юридических страницах используются константы из `src/lib/brand.ts`.
- Структура коммерческих URL и приоритеты кластеров — по `STAGE7_SEO_RECOMMENDATIONS.md` в корне монорепозитория (родительская папка `abkhaziatrip.ru`).
- Добавлен P1-хаб **`/otdyh-abkhazia`** (отдых в Абхазии); фильтры каталога туров на `/tury-abkhazia` работают на клиенте **без** смены URL (контроль дублей).

## Переменные окружения

Для локального демо **не обязательны**: лиды и офферы пишутся в `data/*.json` внутри контейнера/проекта.

| Переменная | Назначение |
|------------|------------|
| *(нет обязательных)* | При росте проекта: вынести секреты операторского входа, SMTP и т.д. |

## Демо-данные («живой» каталог)

| Источник | Описание |
|----------|----------|
| `data/operator-offers.json` | Создаётся при первом обращении из сидов в `src/lib/operator-offers.ts`; партнёрская админка правит эти поля. |
| `src/lib/catalog.ts` | Метаданные витрины (рейтинг, бейджи, сегмент, города вылета) по `id` оффера; для новых id — эвристики. |
| `src/lib/hotels-data.ts` | Каталог отелей (демо) для `/oteli-abkhazia` и блоков на курортах. |
| `src/lib/site-content.ts` | Блоки «почему мы», FAQ, отзывы (синтетика про Абхазию и AbkhaziaTrip). |
| `src/lib/data.ts` | Курорты, статьи блога, справочник городов для `/tury-abkhazia/iz-*`. |

## Что реализовано

- Публичный сайт:
  - главная (хиро, витрина, курорты, «почему мы», отзывы, FAQ, гид);
  - **туры** `/tury-abkhazia` — фильтры, сортировка, поиск, подгрузка, API `GET /api/catalog/tours`;
  - **отдых** `/otdyh-abkhazia` (SEO-хаб);
  - **отели** `/oteli-abkhazia` — фильтры и подгрузка на демо-данных;
  - курорты, региональные SEO-страницы `из города`;
  - контент-хаб (`/blog`) и статьи с `canonical`.
- Продуктовый контур:
  - форма заявки (`/zayavka`);
  - личный кабинет со статусами (`/lichnyy-kabinet`);
  - CRM менеджера (`/admin/leads`) со сменой статусов.
- API:
  - `GET/POST /api/leads`;
  - `PATCH /api/leads/[id]`;
  - `GET /api/catalog/tours` — query: `q`, `resort`, `audience`, `sort`, `page`, `limit`.
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
- выполняет `git fetch` и **`git reset --hard origin/main`** в `/opt/abkhaziatrip.ru` (локальные коммиты только на сервере сотрутся; эталон — GitHub `main`);
- перезапускает только второй сервис через `docker compose up -d --build`;
- проверяет, что `abkhazhub.ru` отвечает.

Нужные secrets в GitHub repository:
- `VDS_HOST` (пример: `178.212.12.157`)
- `VDS_USER` (пример: `root`)
- `VDS_PASSWORD`
- `VDS_PORT` (пример: `22`)

### Задуманная схема на сервере (не трогает abkhazhub)

| Что | Значение |
|-----|----------|
| Рабочая копия | `/opt/abkhaziatrip.ru` |
| Bare-репозиторий | `/opt/git/abkhaziatrip.git` |
| Конфиг nginx trip | `/etc/nginx/sites-available/abkhaziatrip.conf` |
| Проверка изоляции | в конфиге hub должны быть `abkhazhub.ru`, `127.0.0.1:3000`, `127.0.0.1:8000` |
| Контейнер | `docker compose up -d --build` из каталога проекта (файл `docker-compose.yml`) |
| Прод-ветка | только `main` (job не запускается с другой ветки) |

Артефакт деплоя — собранный Docker-образ сервиса `web` на порту **3001**; nginx на хосте проксирует на этот порт (см. конфиг на сервере).

### Если CI «сломался» — что проверить

1. **GitHub → Actions → Deploy Production → красный шаг**  
   Откройте лог шага **«Deploy on server via SSH»** (там полный вывод скрипта).
2. **Секреты** — верны ли `VDS_*` (хост, пользователь, пароль, порт). Смена пароля на VDS ломает вход без обновления secret.
3. **SSH** — не отключён ли вход по паролю для выбранного пользователя; при ключах-only нужен другой способ (ключ в secret, другой action).
4. **Шаг 4 (git)** — если меняли код только на сервере, он перезапишется при деплое (`reset --hard`); держите изменения в GitHub.
5. **Шаг 3 (bare fetch)** — для **приватного** репозитория `git fetch https://github.com/...` с сервера может требовать токен/credential; публичный репозиторий работает без них.
6. **Шаг 5 (docker)** — в `/opt/abkhaziatrip.ru` должен быть `docker-compose.yml`; команда запускается из этого каталога.
7. **Шаг 6–7** — `nginx -t`, `curl` к https://abkhaziatrip.ru и https://abkhazhub.ru; падение curl по hub означает проблему с hub или сетью, не продолжайте правки hub из этого workflow.
