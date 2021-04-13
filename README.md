# SMASH

`backend` – Rails API

`frontend` – React + Redux (redux-persist)

### Создание БД

```
rake db:create
rake db:migrate
```

### Запуск тестов

1. перейти в папку `./backend` и запустить Rails `CYPRESS=1 RAILS_ENV=test rails s`
2. перейти в папку `./frontend` и запустить фронтенд-приложение `???` **WIP**
3. перейти в папку `./frontend` и запустить Cypress `yarn cypress open`

Подготовка БД в сценариях тестов:

```
// some_cypress_spec.js

describe('Rails using factory bot examples', function() {
  beforeEach(() => {
    // Сброс БД
    cy.app('clean') // have a look at cypress/app_commands/clean.rb

    // Подготовка состояния БД
    cy.appFactories([
      ['create', 'user', {
        first_name: 'Name',
        last_name: 'Surname',
        email: 'user@example.com',
        password: '123456
      }]
    ])
  })

  it('using single factory bot', function() {
    // код теста
    // ...
  })
})
```

**[Подробнее](https://github.com/shakacode/cypress-on-rails)**

## Backend

### Требования:

- HomeBrew (Mac OS)
  - http://brew.sh
- RVM
  - https://rvm.io/rvm/install
- Ruby 2.7.0
  ```
    rvm install 2.7.0
  ```
- PostgreSQL 9.6+
  - `brew install postgresql` (Mac OS)
  - `sudo apt-get install postgresql postgresql-contrib` (Linux)
  - `psql postgres` (Mac OS)
  - `sudo -u postgres psql` (Linux)
  - `createuser -s postgres`

### Установка
- Установить гемы
  - `gem install bundler`
  - `bundle install`
- Задать юзера и пароль для postgresql в `database.yml` либо оставить дефолтные значения
- Загрузить базу
  - `rails db:setup`
  - `rails db:seed`
- Запуск для проверки: `rails s`
- Прогнать тесты: `bundle exec rspec`

## Gems and dependencies
### Mailcatcher

Установить mailcatcher через `gem install mailcatcher` в гемсет проекта.
ВАЖНО: устанавливать нужно только через `gem install`, не добавляя в `Gemfile`

Запуск командой `mailcatcher`
Для отслеживания писем перейти на http://localhost:1080/

## Deploy

1. PG https://www.digitalocean.com/community/tutorials/postgresql-ubuntu-16-04-ru
2. Nokogiri
```
sudo apt-get install libxslt1-dev libxml2-dev build-essential patch libsqlite3-dev libcurl4-openssl-dev curl git git-gui vim-gtk exuberant-ctags nodejs rar
```
3. https://www.phusionpassenger.com/library/walkthroughs/deploy/ruby/

### Разработка

Rails выступает только в качестве API, построенном на Grape (https://github.com/ruby-grape/grape).
- Роуты
  - `rails grape:routes`
