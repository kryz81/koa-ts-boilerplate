/* istanbul ignore file */

import { inject, injectable } from 'inversify';
import { APP_PORT } from './config/config';
import App from './app';
import SERVICE_ID from './config/service_id';

@injectable()
export default class Server {
  constructor(@inject(SERVICE_ID.APP) private app: App) {}

  start() {
    this.app.init().listen(APP_PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${APP_PORT}`);
    });
  }
}
