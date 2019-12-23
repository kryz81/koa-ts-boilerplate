import { EventDispatcher } from 'event-dispatch';
import { UsersRepository } from '../users';
import { UserModel } from '../../../models/User';

jest.mock('class-validator', () => ({
  validateOrReject: () => Promise.resolve(),
}));

jest.mock('../../../models/User', () => ({
  UserModel: {
    create: jest.fn((userData) => userData),
    findById: jest.fn(() => UserModel),
    deleteOne: jest.fn(() => ({ deletedCount: 1 })),
    exec: jest.fn(),
  },
}));

jest.mock('../../../utils/generateId', () => ({
  generateId: () => 1,
}));

let usersService: UsersRepository;
beforeEach(() => {
  usersService = new UsersRepository(new EventDispatcher());
});

it('creates a user and returns user id', async () => {
  const userData = {
    name: 'User Name',
    role: 'user',
    email: 'user@email.dev',
  };

  await usersService.addUser(userData);

  expect(UserModel.create).toBeCalledWith({ _id: 1, ...userData });
});

it('looks for the user with given id', () => {
  usersService.getUserById('10');

  expect(UserModel.findById).toBeCalledWith('10');
});

it('deletes the user with given id', () => {
  usersService.deleteUser('20');

  expect(UserModel.deleteOne).toBeCalledWith({ _id: '20' });
});
