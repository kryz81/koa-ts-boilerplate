const { unlinkSync } = require('fs');
const { TMP_CONFIG_FILE } = require(`${__dirname}/config`);

module.exports = async () => {
  await global.__DB__.stop();
  unlinkSync(TMP_CONFIG_FILE);
};
