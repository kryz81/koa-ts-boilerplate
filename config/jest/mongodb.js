const fs = require('fs');
const NodeEnvironment = require('jest-environment-node');
const { TMP_CONFIG_FILE } = require(`${__dirname}/config`);

module.exports = class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    const globalConfig = JSON.parse(fs.readFileSync(TMP_CONFIG_FILE, 'utf-8'));
    this.global.__DBURI__ = globalConfig.dbUri;
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};
