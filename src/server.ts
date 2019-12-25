/* istanbul ignore file */

// job classes need to be loaded before DI container creation
import './jobs/register';
// all subscribers need to be imported before use
import './subscribers/register';

import { injectable } from 'inversify';
import { APP_PORT } from './config/config';
import App from './app';

@injectable()
export default class Server {
  constructor(private app: App) {}

  start() {
    this.app.init().then((app) =>
      app.listen(APP_PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server running on port ${APP_PORT}`);
      }),
    );
  }
}
