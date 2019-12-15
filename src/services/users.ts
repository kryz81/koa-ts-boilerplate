import uuid from 'uuid';
import { User, UserModel } from '../models/User';

export const getUsers = (): Promise<User[]> => UserModel.find().exec();

export const getUserById = (id: string): Promise<User | null> => UserModel.findById(id).exec();

export const addUser = async (data: User): Promise<string> => {
  const userData = {
    _id: uuid(),
    name: data.name,
    role: data.role,
  };
  const { _id } = await UserModel.create(userData);

  return _id;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const { deletedCount } = await UserModel.deleteOne({ _id: id }).exec();

  return deletedCount === 1;
};
