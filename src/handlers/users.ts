import { EventDispatcher } from 'event-dispatch';
import { inject, injectable } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces } from 'inversify-koa-utils';
import { body, path, request as req, responses, summary, tags } from 'koa-swagger-decorator';
import { Context } from 'koa';
import { ValidationError } from 'class-validator';
import { OK, NOT_FOUND, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import SERVICE_ID from '../config/service_id';
import { UsersRepository } from '../services/repositories/users';
import { User } from '../models/User';
import { LOG_EVENT_ID } from '../subscribers/LogEvent';
import { extractValidationErrors } from '../utils/extractValidationErrors';

const usersTag = tags(['users']);
class UserForSwagger extends User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static swaggerDocument: any;
}
const swaggerUserId = { id: { type: 'string', required: true, description: 'user id' } };

const isValidationError = (errors: unknown) => Array.isArray(errors) && errors[0] instanceof ValidationError;

@controller('/users')
@injectable()
class UsersHandler implements interfaces.Controller {
  constructor(
    @inject(SERVICE_ID.USERS_SERVICE) private usersRepositorz: UsersRepository,
    @inject(SERVICE_ID.EVENT_DISPATCHER) private eventDispatcher: EventDispatcher,
  ) {}

  @httpGet('/')
  @req('get', '/users')
  @usersTag
  @summary('Get user list')
  @responses({ [OK]: { description: 'List of users' } })
  async getUserList({ response }: Context) {
    response.body = await this.usersRepositorz.getUsers();
  }

  @httpGet('/:id')
  @req('get', '/users/{id}')
  @usersTag
  @summary('Get user by id')
  @path(swaggerUserId)
  @responses({ [OK]: { description: 'User found' }, [NOT_FOUND]: { description: 'User not found' } })
  async getUserDetails({ params, response }: Context) {
    const user = await this.usersRepositorz.getUserById(params.id);

    if (!user) {
      this.eventDispatcher.dispatch(LOG_EVENT_ID.LOG, {
        level: 'warn',
        message: `Requested user not found`,
        data: { userId: params.id },
      });

      response.status = NOT_FOUND;
      response.body = 'User not found';
      return;
    }

    response.body = user;
  }

  @httpPost('/')
  @req('post', '/users')
  @usersTag
  @summary('Create a new user')
  @responses({ [OK]: { description: 'User created' }, [UNPROCESSABLE_ENTITY]: { description: 'Invalid user data' } })
  @body(UserForSwagger.swaggerDocument)
  async addUser({ request, response }: Context) {
    try {
      const userId = await this.usersRepositorz.addUser(request.body);
      response.body = { userId };
    } catch (err) {
      if (isValidationError(err)) {
        response.status = UNPROCESSABLE_ENTITY;
        response.body = { msg: 'Invalid user data', errors: extractValidationErrors(err) };
        return;
      }
      throw err;
    }
  }

  @httpPut('/:id')
  @req('put', '/users/{id}')
  @usersTag
  @summary('Update user')
  @responses({
    [OK]: { description: 'User updated' },
    [NOT_FOUND]: { description: 'User not found' },
    [UNPROCESSABLE_ENTITY]: { description: 'Invalid user data' },
  })
  @body(UserForSwagger.swaggerDocument)
  @path(swaggerUserId)
  async updateUser({ params, request, response }: Context) {
    try {
      const userUpdated = await this.usersRepositorz.updateUser(params.id, request.body);
      if (!userUpdated) {
        response.status = NOT_FOUND;
        response.body = 'User not found';
        return;
      }
      response.body = 'User updated';
    } catch (err) {
      if (isValidationError(err)) {
        response.status = UNPROCESSABLE_ENTITY;
        response.body = { msg: 'Invalid user data', errors: extractValidationErrors(err) };
        return;
      }
      throw err;
    }
  }

  @httpDelete('/:id')
  @req('delete', '/users/{id}')
  @usersTag
  @summary('Delete user')
  @path(swaggerUserId)
  @responses({ [OK]: { description: 'User deleted' }, [NOT_FOUND]: { description: 'User not found' } })
  async deleteUser({ params, response }: Context) {
    const deleted = await this.usersRepositorz.deleteUser(params.id);

    if (!deleted) {
      response.status = NOT_FOUND;
      response.body = 'User not found';
      return;
    }

    response.body = 'User deleted';
  }
}

export default UsersHandler;
