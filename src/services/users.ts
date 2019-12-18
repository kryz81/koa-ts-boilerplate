import { generateId } from '../utils/generateId';
import { User, UserModel } from '../models/User';

const createUserData = (data: User): User => ({
  name: data.name,
  role: data.role,
});

export const getUsers = (): Promise<User[]> => UserModel.find().exec();

export const getUserById = (id: string): Promise<User | null> => UserModel.findById(id).exec();

export const addUser = async (data: User): Promise<string> => {
  const userData = {
    _id: generateId(),
    ...createUserData(data),
  };

  const { _id } = await UserModel.create(userData);

  return _id;
};

export const updateUser = async (userId: string, data: User): Promise<boolean> => {
  const userData = createUserData(data);
  const updated = await UserModel.findByIdAndUpdate(userId, userData, { new: true, runValidators: true });

  return updated !== null;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const { deletedCount } = await UserModel.deleteOne({ _id: id }).exec();

  return deletedCount === 1;
};
