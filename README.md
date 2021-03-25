# SMASH

## Разработка

### Требования:

- HomeBrew (Mac OS)
  - http://brew.sh
- RVM
  - https://rvm.io/rvm/install
- Ruby 2.7.0
  ```
    rvm install 2.7.0
  ```
- Node JS
  - https://nodejs.org/en/download/
  
- PostgreSQL 9.6+
  - `brew install postgresql` (Mac OS)
  - `sudo apt-get install postgresql postgresql-contrib` (Linux)
  - `psql postgres` (Mac OS)
  - `sudo -u postgres psql` (Linux)
  - `createuser -s postgres`

### Установка
- Склонировать проект
  ```
  $ git clone https://github.com/robarin/smash.git
  ```
- Установить гемы
  - `gem install bundler`
  - `bundle install`
- Задать юзера и пароль для postgresql в `database.yml` либо оставить дефолтные значения
- Загрузить базу
  - `rails db:setup`
- Запуск для проверки: `cd backend && rails s`
- Прогнать тесты: `cd backend && bundle exec rspec`

## Gems and dependencies
### Mailcatcher

Установить mailcatcher через `gem install mailcatcher` в гемсет проекта.

Запуск командой `mailcatcher`
Для отслеживания писем перейти на http://localhost:1080/

## Deploy

1. PG https://www.digitalocean.com/community/tutorials/postgresql-ubuntu-16-04-ru
2. Nokogiri
```
sudo apt-get install libxslt1-dev libxml2-dev build-essential patch libsqlite3-dev libcurl4-openssl-dev curl git git-gui vim-gtk exuberant-ctags nodejs rar
```
3. https://www.phusionpassenger.com/library/walkthroughs/deploy/ruby/
