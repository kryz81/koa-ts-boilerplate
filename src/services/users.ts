import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { generateId } from '../utils/generateId';
import { User, UserModel } from '../models/User';

const createUserData = (data: User): User => ({
  name: data.name,
  role: data.role,
  email: data.email,
});

export const getUsers = (): Promise<User[]> => UserModel.find().exec();

export const getUserById = (id: string): Promise<User | null> => UserModel.findById(id).exec();

export const addUser = async (uncheckedUserData: unknown): Promise<string> => {
  const uncheckedUser: User = plainToClass(User, uncheckedUserData);

  await validateOrReject(uncheckedUser);

  const userData = {
    _id: generateId(),
    ...createUserData(uncheckedUser),
  };

  const { _id } = await UserModel.create(userData);

  return _id;
};

export const updateUser = async (userId: string, uncheckedUserData: unknown): Promise<boolean> => {
  const uncheckedUser: User = plainToClass(User, uncheckedUserData);

  await validateOrReject(uncheckedUser);

  const userData = createUserData(uncheckedUser);
  const updated = await UserModel.findByIdAndUpdate(userId, userData, { new: true, runValidators: true });

  return updated !== null;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const { deletedCount } = await UserModel.deleteOne({ _id: id });

  return deletedCount === 1;
};
