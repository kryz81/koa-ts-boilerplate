# good practice: use LTS version of Node.js and minimal OS
FROM node:12-alpine

EXPOSE 3000

RUN apk add --no-cache tini

ENV NODE_ENV=development

# good practice: don't run as a root
USER node

WORKDIR /home/node

COPY package.json yarn.lock ./

RUN yarn

# good practice: don't use ADD (more complex, not needed for local copy)
COPY --chown=node:node . .

ENTRYPOINT ["tini", "--"]

# much better option here would be to run node directly, because npm/yarn creates another process in container
CMD ["yarn", "start:dev"]
