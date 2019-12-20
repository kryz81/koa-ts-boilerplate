# Node.js App Boilerplate

[![Build Status](https://travis-ci.org/kryz81/koa-ts-boilerplate.svg?branch=master)](https://travis-ci.org/kryz81/koa-ts-boilerplate.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/kryz81/koa-ts-boilerplate/badge.svg)](https://coveralls.io/github/kryz81/koa-ts-boilerplate)
[![Known Vulnerabilities](https://snyk.io/test/github/kryz81/koa-ts-boilerplate/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kryz81/koa-ts-boilerplate?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/8d8e2c9b9ef9ad495e72/maintainability)](https://codeclimate.com/github/kryz81/koa-ts-boilerplate/maintainability)

### Features

- [x] Language: Typescript
- [x] Framework: Koa
- [x] API Docs: Swagger + Koa Docs Generator
  - [x] Swagger
  - [x] Koa Swagger Decorator
- [x] Testing
  - [x] Unit tests: Jest
  - [x] Functional tests: Supertest, MongoDB In-Memory
  - [ ] Mutation tests: Stryker
- [x] Linting
  - [x] Eslint with Typescript
- [x] Code Formatting
  - [x] Prettier
  - [ ] Editorconfig
- [x] Database
  - [x] Mongoose
  - [x] Typegoose
- [x] Requests validation: class-validator
- [ ] Background jobs: Agenda
- [ ] Event Manager
- [ ] Logger (Winston?)
- [ ] Dependency Injection
- [x] Commits linting: Commitlint + Husky
- [ ] Docker
  - [x] Development environment
  - [ ] Production environment
- [ ] Database migrations (migrate-mongo)
- [x] Continuous Integration
  - [x] Travis CI
  - [x] Coveralls
- [x] Code quality check
  - [x] Code Climate
- [x] Security Check
  - [x] Snyk

### To fix

- [ ] Configure Node.js global object and remove "(global as any)"
- [ ] Output "id" instead of "\_id" (virtual property with typegoose?)
- [ ] yarn runs either all dependencies or only production deps, how to install dev dependencies ONLY?
- [ ] Command "docker-compose exec web yarn test:once" fails -> no tests to run found

### Install and start developing (locally, without docker)

- create .env, copy content from .env.dist and set variables, for example: APP_PORT=3000, DB_HOST=localhost:27017, DB_NAME=myapp
- .env file is ignored by git and shouldn't be pushed to repo
- yarn (or: npm i)
- run in development mode: yarn start:dev (or: npm run start:dev)
- run tests in development mode: yarn test (or: npm test)

### Develop using docker machine

| Command                                    | Description                                      |
| ------------------------------------------ | ------------------------------------------------ |
| docker-compose up --build                  | start in development mode (no debugger enabled)  |
| TARGET=debugging docker-compose up --build | start in development mode with debugger attached |

### Commands

| Command       | Description                                                |
| ------------- | ---------------------------------------------------------- |
| start:prod    | run production version (must be built with "build" command |
| start:dev     | run in development mode                                    |
| start:debug   | run in development mode with enabled debugger              |
| build         | build production version                                   |
| clean         | remove node_modules, coverage, built app and so on         |
| test          | run tests in watch mode                                    |
| test:once     | run all tests once                                         |
| test:coverage | run all tests and export code coverage                     |
| lint          | lint code                                                  |
| format:check  | check code for formatting issues                           |
| format:write  | check and automatically fix formatting issues              |

### Build and run in production

- yarn build && yarn start:prod (or: npm run build && npm run start:prod)

### Swagger UI

Open: localhost:3000/api-docs/html or localhost:3000/api-docs/json

### How to debug with docker and intelliJ

- Edit configurations -> new configuration -> Attach to Node.js/Chrome
- Host: localhost, port: 9229
- Run docker machine with debugger: TARGET=debugging docker-compose up --build
- Run "debug"
