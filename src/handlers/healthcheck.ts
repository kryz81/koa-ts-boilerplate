import mongoose from 'mongoose';
import { injectable } from 'inversify';
import { Context } from 'koa';

@injectable()
class HealthcheckHandler {
  // eslint-disable-next-line class-methods-use-this
  async ping({ response }: Context) {
    try {
      // check if mongodb is alive
      await mongoose.connection.db.admin().ping();
      response.body = 'OK';
    } catch (err) {
      response.status = 503;
    }
  }
}

export default HealthcheckHandler;
