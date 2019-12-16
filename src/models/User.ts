import { getModelForClass, prop } from '@typegoose/typegoose';
import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@swaggerClass()
export class User {
  @prop({ required: false })
  @swaggerProperty({ type: 'string' })
  public _id?: string;

  @prop({ required: true })
  @swaggerProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @Length(3)
  public name!: string;

  @prop({ required: true })
  @swaggerProperty({ type: 'string', required: true })
  @IsNotEmpty()
  public role!: string;

  @prop({ required: true })
  @swaggerProperty({ type: 'string', required: false })
  @IsEmail()
  public email?: string;
}

export const UserModel = getModelForClass(User);
