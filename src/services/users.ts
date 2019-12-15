import { User, UserModel } from '../models/User';

export const getUsers = (): Promise<User[]> => UserModel.find().exec();

export const getUserById = (id: string): Promise<User | undefined> => UserModel.findById(id).exec();
