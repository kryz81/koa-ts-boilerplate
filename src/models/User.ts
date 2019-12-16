import { getModelForClass, prop } from '@typegoose/typegoose';
import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator';

@swaggerClass()
export class User {
  @prop({ required: true })
  @swaggerProperty({ type: 'string', required: true })
  public _id!: string;

  @prop({ required: true })
  @swaggerProperty({ type: 'string', required: true })
  public name!: string;

  @prop({ required: true })
  @swaggerProperty({ type: 'string', required: true })
  public role!: string;
}

export const UserModel = getModelForClass(User);
