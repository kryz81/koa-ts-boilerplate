# good practice: use LTS version of Node.js and minimal OS
FROM node:12-buster as base

EXPOSE 3000

# good practice: use tini for better process management
RUN apt update && apt install -y tini

# good practice: don't run as a root
USER node

# good practice: install node_modules in parent directory
WORKDIR /home/node

COPY package.json yarn.lock ./

RUN yarn

# good practice: copy source code to subdirectory
WORKDIR /home/node/app

ENV PATH=/home/node/node_modules/.bin:$PATH

# good practice: don't use ADD (more complex, not needed for local copy)
COPY --chown=node:node . .

# good practice: tini takes care of node process
ENTRYPOINT ["tini", "--"]

FROM base as debugging

# we need debug port
EXPOSE 3000 9229

ENV NODE_ENV=debugging

CMD ["yarn", "start:debug"]

FROM base as development

ENV NODE_ENV=development

# much better option here would be to run node directly, because npm/yarn creates another process in container
CMD ["yarn", "start:dev"]
