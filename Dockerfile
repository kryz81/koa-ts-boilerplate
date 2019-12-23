# good practice: use LTS version of Node.js and minimal OS
FROM node:12-buster as base

EXPOSE 3000 9229

# good practice: use tini for better process management
RUN apt update && apt install -y tini

HEALTHCHECK --interval=10s --timeout=3s CMD curl -f http://localhost:3000/healthcheck/ || exit 1

# good practice: don't run as a root
USER node

# good practice: install node_modules in parent directory
WORKDIR /home/node

COPY package.json yarn.lock ./

RUN yarn

# good practice: copy source code to subdirectory
WORKDIR /home/node/app

# access .bin tools from parent node_modules
ENV PATH=/home/node/node_modules/.bin:$PATH

# good practice: don't use ADD (more complex, not needed for local copy)
COPY --chown=node:node . .

# good practice: tini takes care of node process
ENTRYPOINT ["tini", "--"]
