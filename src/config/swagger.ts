import { SwaggerRouter } from 'koa-swagger-decorator';
import mongooseToSwagger from 'mongoose-to-swagger';
import { UserModel } from '../models/User';

const router = new SwaggerRouter();

router.swagger({
  title: 'Test Project',
  description: 'Test Project Application',
  version: '1.0.0',
  swaggerHtmlEndpoint: '/api-docs/html',
  swaggerJsonEndpoint: '/api-docs/json',
  swaggerOptions: {
    definitions: {
      User: mongooseToSwagger(UserModel, { props: ['example'] }),
    },
  },
});

router.mapDir(`${__dirname}/../handlers`);

export default router;
