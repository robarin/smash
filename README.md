# SMASH

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
  
### Seeds

При создании нового файла сидов в `db/seeds` нужно обязательно добавить его в массив имен файлов в `db/seeds.rb` в том порядке, в котором этот файл должен запускаться. Например, файл сидов `regions.rb` должен следовать после файла `countries.rb`.

При написании нового файла сидов нужно учитывать следующее:
- Называть файл простым и понятным именем
- Не создавать в одном файле объекты более чем одного типа, если только они не связаны между собой семантически и на уровне БД.
- Чтобы избежать конфликтов или создания дублированных объектов в базе, объекты нужно создавать либо через `find_or_create_by!`, либо используя подход **guard clause** (https://devblast.com/b/what-are-guard-clauses)
- Для удобства расширения кол-ва создаваемых объектов внутри одного файла сидов, нужно писать его так, чтобы при повторном запуске существующие объекты не дублировались, а создавались только новые. Для этого нужно использовать массивы исходных данных и guard clause внутри итераций
- Создавать достаточное кол-во объектов для полноценного тестирования
- При создании объектов со сложными связями, или когда объекты должны создаваться только в большом количестве, оборачивать весь процесс в транзакцию
- После каждого изменения сидов убедиться, что все сиды прогоняются без ошибок

### Приемочное тестирование

1. в корне проекта запустить `CYPRESS=1 RAILS_ENV=test rails s`
2. запустить фронтенд-приложение `cd frontend && yarn start`
3. запустить Cypress `yarn cypress open`

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
