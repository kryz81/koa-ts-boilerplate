import { addUser, deleteUser, getUserById } from '../users';
import { UserModel } from '../../models/User';

jest.mock('../../models/User', () => ({
  UserModel: {
    create: jest.fn((userData) => userData),
    findById: jest.fn(() => UserModel),
    deleteOne: jest.fn(() => ({ deletedCount: 1 })),
    exec: jest.fn(),
  },
}));

jest.mock('../../utils/generateId', () => ({
  generateId: () => 1,
}));

it('creates a user and returns user id', () => {
  const userData = {
    name: 'User Name',
    role: 'User Role',
  };

  addUser(userData);

  expect(UserModel.create).toBeCalledWith({ _id: 1, ...userData });
});

it('looks for the user with given id', () => {
  getUserById('10');

  expect(UserModel.findById).toBeCalledWith('10');
});

it('deletes the user with given id', () => {
  deleteUser('20');

  expect(UserModel.deleteOne).toBeCalledWith({ _id: '20' });
});
