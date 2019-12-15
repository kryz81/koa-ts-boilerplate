import { Context } from 'koa';
import { body, path, request as req, summary, tags } from 'koa-swagger-decorator';
import * as usersService from '../services/users';
import { User } from '../models/User';

const usersTag = tags(['users']);

class Users {
  @req('get', '/users')
  @usersTag
  @summary('Get user list')
  static async getUserList({ response }: Context) {
    response.body = await usersService.getUsers();
  }

  @req('get', '/users/{id}')
  @usersTag
  @summary('Get user by id')
  @path({ id: { type: 'string', required: true, description: 'user id' } })
  static async getUserDetails({ params, response }: Context) {
    const user = await usersService.getUserById(params.id);

    if (!user) {
      response.status = 404;
      response.body = 'User not found';
      return;
    }

    response.body = user;
  }

  @req('post', '/users')
  @usersTag
  @summary('Create a new user')
  @body(User)
  static async addUser({ request, response }: Context) {
    response.body = await usersService.addUser(request.body);
  }

  @req('put', '/users/:id')
  @usersTag
  @summary('Update user')
  @body(User)
  @path({ id: { type: 'string', required: true, description: 'user id' } })
  static async updateUser({ response }: Context) {
    response.body = 'Not Implemented Yet';
  }

  @req('delete', '/users/:id')
  @usersTag
  @summary('Delete user')
  @path({ id: { type: 'string', required: true, description: 'user id' } })
  static async deleteUser({ params, response }: Context) {
    const deleted = await usersService.deleteUser(params.id);

    if (!deleted) {
      response.status = 404;
      response.body = 'User not found';
      return;
    }

    response.body = 'User deleted';
  }
}

export default Users;
