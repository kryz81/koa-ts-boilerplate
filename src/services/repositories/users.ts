import { ModelType } from '@typegoose/typegoose/lib/types';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { EventDispatcher } from 'event-dispatch';
import { inject, injectable } from 'inversify';
import SERVICE_ID from '../../config/service_id';
import { EVENT_ID } from '../../subscribers/UserEvent';
import { generateId } from '../../utils/generateId';
import { User, UserModel } from '../../models/User';

const createUserData = (data: User): User => ({
  name: data.name,
  role: data.role,
  email: data.email,
});

@injectable()
export class UsersService {
  protected userModel: ModelType<User>;

  protected eventDispatcher: EventDispatcher;

  constructor(@inject(SERVICE_ID.EVENT_DISPATCHER) eventDispatcher: EventDispatcher) {
    this.userModel = UserModel;
    this.eventDispatcher = eventDispatcher;
  }

  getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async addUser(uncheckedUserData: unknown): Promise<string> {
    const uncheckedUser: User = plainToClass(User, uncheckedUserData);

    await validateOrReject(uncheckedUser);

    const userData = {
      _id: generateId(),
      ...createUserData(uncheckedUser),
    };

    const createdUser = await this.userModel.create(userData);

    this.eventDispatcher.dispatch(EVENT_ID.USER_CREATE, createdUser);

    return createdUser._id;
  }

  async updateUser(userId: string, uncheckedUserData: unknown): Promise<boolean> {
    const uncheckedUser: User = plainToClass(User, uncheckedUserData);

    await validateOrReject(uncheckedUser);

    const userData = createUserData(uncheckedUser);
    const updated = await this.userModel.findByIdAndUpdate(userId, userData, { new: true, runValidators: true });

    this.eventDispatcher.dispatch(EVENT_ID.USER_UPDATE, updated);

    return updated !== null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id });

    return deletedCount === 1;
  }
}
