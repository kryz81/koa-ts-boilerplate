// connect to db and hide deprecation warnings
import mongoose from 'mongoose';
import { DB_ENDPOINT } from '../config/config';

const dbLoader = () => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useUnifiedTopology', true);

  mongoose
    .connect(DB_ENDPOINT)
    // eslint-disable-next-line no-console
    .then(() => console.log(`Connected to ${DB_ENDPOINT}`))
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err.message));
};

export default dbLoader;
