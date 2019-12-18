import { body, path, request as req, responses, summary, tags } from 'koa-swagger-decorator';
import { Context } from 'koa';
import { ValidationError } from 'class-validator';
import * as usersService from '../services/users';
import { User } from '../models/User';
import { extractValidationErrors } from '../utils/extractValidationErrors';

const usersTag = tags(['users']);
class UserForSwagger extends User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static swaggerDocument: any;
}
const swaggerUserId = { id: { type: 'string', required: true, description: 'user id' } };

const isValidationError = (errors: unknown) => Array.isArray(errors) && errors[0] instanceof ValidationError;

class Users {
  @req('get', '/users')
  @usersTag
  @summary('Get user list')
  @responses({ 200: { description: 'List of users' } })
  static async getUserList({ response }: Context) {
    response.body = await usersService.getUsers();
  }

  @req('get', '/users/{id}')
  @usersTag
  @summary('Get user by id')
  @path(swaggerUserId)
  @responses({ 200: { description: 'User found' }, 404: { description: 'User not found' } })
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
  @responses({ 200: { description: 'User created' }, 422: { description: 'Invalid user data' } })
  @body(UserForSwagger.swaggerDocument)
  static async addUser({ request, response }: Context) {
    try {
      const userId = await usersService.addUser(request.body);
      response.body = { userId };
    } catch (err) {
      if (isValidationError(err)) {
        response.status = 422;
        response.body = { msg: 'Invalid user data', errors: extractValidationErrors(err) };
        return;
      }
      throw err;
    }
  }

  @req('put', '/users/:id')
  @usersTag
  @summary('Update user')
  @body(UserForSwagger.swaggerDocument)
  @path(swaggerUserId)
  static async updateUser({ params, request, response }: Context) {
    try {
      const userUpdated = await usersService.updateUser(params.id, request.body);
      if (!userUpdated) {
        response.status = 404;
        response.body = 'User not found';
        return;
      }
      response.body = 'User updated';
    } catch (err) {
      if (isValidationError(err)) {
        response.status = 422;
        response.body = { msg: 'Invalid user data', errors: extractValidationErrors(err) };
        return;
      }
      console.log(err);
      throw err;
    }
  }

  @req('delete', '/users/:id')
  @usersTag
  @summary('Delete user')
  @path(swaggerUserId)
  @responses({ 200: { description: 'User deleted' }, 404: { description: 'User not found' } })
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
