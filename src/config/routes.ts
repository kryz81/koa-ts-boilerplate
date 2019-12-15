import Router from 'koa-router';

import * as users from '../handlers/users';

const routes: Router = new Router();

routes
  .get('/users', users.getUserList)
  .get('/users/:id', users.getUserDetails)
  .post('/users', users.addUser)
  .put('/users/:id', users.updateUser)
  .delete('/users:id', users.deleteUser);

export default routes;
