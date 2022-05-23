<h1 id="requirements">Шаурма бот</h1>

Телеграм бот для поиска заведений с шаурмой в Новочеркасске. Приложение позволяет:

- Получать список заведений в городе
- Просматривать информацию о заведении - название, адрес, рейтинг
- Ставить свою оценку каждому заведению

<h2 id="requirements">Требования для запуска</h2>

- **Node.js**: v14 и выше
- **npm**: v6 и выше

<h2 id="stack"> Используемые технологии</h2>

- **Node.js**: платформа для работы с JavaScript
- **Axios**: библиотека для использования запросов к созданному серверу
- **Express**: веб-фреймворк для создания собственного API,
- **PostgreSQL**: система баз данных для хранения оценок, оставленных в телеграм боте.
- **Sequelize**: ORM (инструмент для упрощения работы СУБД PostgreSQL),
- **Telegraf**: инструмент для работы с Telegtram API

<h2 id="stack">  Запуск приложения</h2>

1. Слонируйте репозиторий `git@github.com:Fortech-Nvch/shawarma-fortech-bot.git`
2. Перейдите в папку с проектом `cd shawarma-fortech-bot`
3. Установите все зависимости `npm install`
4. Выполните команду `cp .env.example .env` чтобы скопировать содержимое файла `.env.example` в новый `.env`
5. Откройте файл `.env` в вашем редакторе кода и заполните все поля. <a href="#env-config">Как настроить .env файл</a>
6. Выполните команду `npm start`
7. Перейдите по ссылке которую получили при регистрации Telegram Bot

![alt text](public/telegram.png 'Heroku PostreSQL Add-on')

<h3 id="env-config">.env</h3>

- **BOT_TOKEN:**
  - Перейти в бота: @BotFather
  - Нажать кнопку: START
  - Написать боту: /newbot.
  - Бот спросит вас как назвать нового бота. Придумайте и напишите.
  - Далее нужно ввести ник бота, что бы он заканчивался нa слово bot.
- **GOOGLE_MAP_KEY:** [Руководство как получить Google Map Key](https://help.flexbe.ru/api-google-maps/)
- **DB_PASSWORD, DB_HOST, DB_NAME, DB_USER_NAME:** <a href="#bd-connection">Данные для подключения PostgreSQL</a>

<h3 id="bd-connection">Данные для подключения PostgreSQL</h3>

1. Зарегистрируйтесь на сайте https://www.heroku.com/
2. Создайте новое приложение
   ![alt text](public/new_app.png 'Новое приложение')
3. перейдите в него и во вкладке `Resources` в поле ввода найдте Add-on `Heroku Postgres`. В результате должно выглядеть так.
   ![alt text](public/add_on.png 'Heroku PostreSQL Add-on')

4. Нажмите на этот Add-on и перейдите страницу настройки Heroku Postgress и перейдите во вкладку `Settings` и нажмите на кнопку `View Credentials...`
   ![alt text](public/db_cred.png 'Heroku PostreSQL Add-on')
5. Запишите недостающие данные в поля **DB_PASSWORD, DB_HOST, DB_NAME, DB_USER_NAME** в файл `.env`:
