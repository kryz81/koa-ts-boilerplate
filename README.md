# Node.js App Boilerplate

### Features

- [x] Language: Typescript
- [x] Framework: Koa
- [x] API Docs: Swagger + Koa Docs Generator
- [x] Testing: Jest, Supertest
- [x] Linting: Eslint
- [x] Code Formatting: Prettier
- [x] DB: Mongoose + Typegoose
- [x] Requests validation: class-validator
- [x] Commits linting: Commitlint + Husky
- [ ] TODO Docker machine for development
- [ ] TODO CI pipeline

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
- test:once - run all tests once and create code coverage
- lint - lint code
- format:check - check code for formatting issues
- format:write - check and fix formatting issues

### Build and run in production

- yarn build && yarn start:prod (or: npm run build && npm run start:prod)

### Swagger UI

Open: localhost:3000/api-docs/html or localhost:3000/api-docs/json
