import { SwaggerRouter } from 'koa-swagger-decorator';

const router = new SwaggerRouter();

router.swagger({
  title: 'Test Project',
  description: 'Test Project Application',
  version: '1.0.0',
  swaggerHtmlEndpoint: '/api-docs/html',
  swaggerJsonEndpoint: '/api-docs/json',
});

router.mapDir(`${__dirname}/../handlers`);

export default router;
