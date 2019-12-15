import { Context } from 'koa';
import * as usersService from '../services/users';

export const getUserList = async ({ response }: Context) => {
  response.body = await usersService.getUsers();
};

export const getUserDetails = async ({ params, response }: Context) => {
  const user = await usersService.getUserById(params.id);

  if (!user) {
    response.status = 404;
    response.body = 'User not found';
    return;
  }

  response.body = user;
};

export const addUser = async ({ request, response }: Context) => {
  response.body = await usersService.addUser(request.body);
};

export const updateUser = async ({ response }: Context) => {
  response.body = 'Not Implemented Yet';
};

export const deleteUser = async ({ params, response }: Context) => {
  const deleted = await usersService.deleteUser(params.id);

  if (!deleted) {
    response.status = 404;
    response.body = 'User not found';
    return;
  }

  response.body = 'User deleted';
};
