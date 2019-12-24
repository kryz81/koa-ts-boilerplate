// connect to db and hide deprecation warnings
import mongoose from 'mongoose';
import { DB_ENDPOINT } from '../config/config';

export const dbConfig = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const dbLoader = () => {
  mongoose.set('useNewUrlParser', dbConfig.useNewUrlParser);
  mongoose.set('useFindAndModify', dbConfig.useFindAndModify);
  mongoose.set('useUnifiedTopology', dbConfig.useUnifiedTopology);

  if (!DB_ENDPOINT) {
    // eslint-disable-next-line no-console
    console.error('DB_ENDPOINT is undefined. Did you setup the .env file?');
  }

  return (
    mongoose
      .connect(DB_ENDPOINT)
      // eslint-disable-next-line no-console
      .then(() => console.log(`Connected to ${DB_ENDPOINT}`))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err.message))
  );
};

export default dbLoader;
