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
