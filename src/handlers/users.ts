import { Context } from 'koa';

export const getUserList = ({ response }: Context) => {
  response.body = 'users list';
};

export const getUserDetails = ({ params, response }: Context) => {
  response.body = `user id ${params.id}`;
};

export const addUser = ({ body, response }: Context) => {
  response.body = `add user: ${JSON.stringify(body)}`;
};

export const updateUser = ({ body, params, response }: Context) => {
  response.body = `add user ${params.id}: ${JSON.stringify(body)}`;
};

export const deleteUser = ({ params, response }: Context) => {
  response.body = `delete user ${params.id}`;
};
