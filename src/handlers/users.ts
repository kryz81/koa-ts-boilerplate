import { EventDispatcher } from 'event-dispatch';
import { injectable } from 'inversify';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  requestBody,
  requestParam,
  response,
} from 'inversify-koa-utils';
import { body, path, request as req, responses, summary, tags } from 'koa-swagger-decorator';
import { Response } from 'koa';
import { ValidationError } from 'class-validator';
import { OK, NOT_FOUND, UNPROCESSABLE_ENTITY } from 'http-status-codes';
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
  constructor(private usersRepository: UsersRepository, private eventDispatcher: EventDispatcher) {}

  @httpGet('/')
  @req('get', '/users')
  @usersTag
  @summary('Get user list')
  @responses({ [OK]: { description: 'List of users' } })
  async getUserList(@response() res: Response) {
    res.body = await this.usersRepository.getUsers();
  }

  @httpGet('/:id')
  @req('get', '/users/{id}')
  @usersTag
  @summary('Get user by id')
  @path(swaggerUserId)
  @responses({ [OK]: { description: 'User found' }, [NOT_FOUND]: { description: 'User not found' } })
  async getUserDetails(@requestParam('id') userId: string, @response() res: Response) {
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      this.eventDispatcher.dispatch(LOG_EVENT_ID.LOG, {
        level: 'warn',
        message: `Requested user not found`,
        data: { userId },
      });

      res.status = NOT_FOUND;
      res.body = 'User not found';
      return;
    }

    res.body = user;
  }

  @httpPost('/')
  @req('post', '/users')
  @usersTag
  @summary('Create a new user')
  @responses({ [OK]: { description: 'User created' }, [UNPROCESSABLE_ENTITY]: { description: 'Invalid user data' } })
  @body(UserForSwagger.swaggerDocument)
  async addUser(@requestBody() userData: User, @response() res: Response) {
    try {
      const userId = await this.usersRepository.addUser(userData);
      res.body = { userId };
    } catch (err) {
      if (isValidationError(err)) {
        res.status = UNPROCESSABLE_ENTITY;
        res.body = { msg: 'Invalid user data', errors: extractValidationErrors(err) };
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
  async updateUser(@requestParam('id') userId: string, @requestBody() userData: User, @response() res: Response) {
    try {
      const userUpdated = await this.usersRepository.updateUser(userId, userData);
      if (!userUpdated) {
        res.status = NOT_FOUND;
        res.body = 'User not found';
        return;
      }
      res.body = 'User updated';
    } catch (err) {
      if (isValidationError(err)) {
        res.status = UNPROCESSABLE_ENTITY;
        res.body = { msg: 'Invalid user data', errors: extractValidationErrors(err) };
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
  async deleteUser(@requestParam('id') userId: string, @response() res: Response) {
    const deleted = await this.usersRepository.deleteUser(userId);

    if (!deleted) {
      res.status = NOT_FOUND;
      res.body = 'User not found';
      return;
    }

    res.body = 'User deleted';
  }
}

export default UsersHandler;
