/* istanbul ignore file */

import { injectable } from 'inversify';
import { InversifyKoaServer } from 'inversify-koa-utils';
import Koa from 'koa';
import container from './config/dic';
import { init } from './loaders/init';
import swagger from './config/swagger';

@injectable()
class App {
  protected app: Koa;

  constructor() {
    this.app = new Koa();
  }

  async init(): Promise<Koa> {
    // init services, middleware
    await init(this.app);

    const builtApp = new InversifyKoaServer(container, undefined, undefined, this.app).build();

    // add swagger docs
    builtApp.use(swagger.routes()).use(swagger.allowedMethods());

    return builtApp;
  }
}

export default App;
