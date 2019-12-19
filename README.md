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
- [x] Commits linting: Commitlint + Husky
- [ ] Docker
  - [x] Development environment
  - [ ] Production environment
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

### Install and start developing

- yarn (or: npm i)
- create .env, copy content from .env.dist and set variables, for example: APP_PORT=3000, DB_HOST=localhost:27017, DB_NAME=myapp
- do not push .env to git repo!
- run app in development mode: yarn start:dev (or: npm run start:dev)
- run tests in development mode: yarn test (or: npm test)

### Commands

- start:prod - run production version
- start:dev - run in development
- start:debug - run in development with enabled debugger
- build - build production version
- clean - remove build version, coverage and node_modules
- test - run tests in watch mode
- test:once - run all tests once
- test:coverage - run all tests and collect code coverage
- lint - lint code
- format:check - check code for formatting issues
- format:write - check and fix formatting issues

### Build and run in production

- yarn build && yarn start:prod (or: npm run build && npm run start:prod)

### Swagger UI

Open: localhost:3000/api-docs/html or localhost:3000/api-docs/json
