import { APP_PORT } from './config/config';
import app from './app';

export default app.listen(APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${APP_PORT}`);
});
