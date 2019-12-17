const { writeFileSync } = require('fs');
const MongodbMemoryServer = require('mongodb-memory-server-global');
const { DB_HOST, DB_NAME, DB_PORT, MONGODB_VERSION, TMP_CONFIG_FILE } = require(`${__dirname}/config`);

const mongod = new MongodbMemoryServer.default({
  instance: {
    ip: DB_HOST,
    port: DB_PORT,
    dbName: DB_NAME,
  },
  binary: {
    version: MONGODB_VERSION,
  },
  autoStart: false,
});

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const mongoConfig = {
    mongoDBName: DB_NAME,
    dbUri: await mongod.getConnectionString(),
  };

  writeFileSync(TMP_CONFIG_FILE, JSON.stringify(mongoConfig));
  global.__DB__ = mongod;
};
