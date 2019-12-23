import mongoose from 'mongoose';
import { injectable } from 'inversify';
import { controller, httpGet, interfaces, response } from 'inversify-koa-utils';
import { Context } from 'koa';

@controller('/healthcheck')
@injectable()
class HealthcheckHandler implements interfaces.Controller {
  @httpGet('/')
  // eslint-disable-next-line class-methods-use-this
  async ping(@response() res: Context) {
    try {
      // check if mongodb is alive
      await mongoose.connection.db.admin().ping();
      res.body = 'OK';
    } catch (err) {
      res.status = 503;
    }
  }
}

export default HealthcheckHandler;
