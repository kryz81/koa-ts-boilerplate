import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public role!: string;
}

export const UserModel = getModelForClass(User);
