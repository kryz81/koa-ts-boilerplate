import Router from 'koa-router';

import Users from '../handlers/users';

const routes: Router = new Router();

routes
  .get('/users', Users.getUserList)
  .get('/users/:id', Users.getUserDetails)
  .post('/users', Users.addUser)
  .put('/users/:id', Users.updateUser)
  .delete('/users:id', Users.deleteUser);

export default routes;
