import { getModelForClass, prop } from '@typegoose/typegoose';
import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Role } from './Role';

@swaggerClass()
export class User {
  @prop({ required: false })
  public _id?: string;

  @prop({ required: true, example: '"kryz"' })
  @swaggerProperty({ type: 'string', required: true, example: 'kryz' })
  @IsNotEmpty()
  @Length(3)
  public name!: string;

  @prop({ required: true, example: '"admin"' })
  @swaggerProperty({ type: 'string', required: true, example: 'admin' })
  @IsNotEmpty()
  @IsEnum(Role)
  public role!: string;

  @prop({ required: false, example: '"k@kryz.dev"' })
  @swaggerProperty({ type: 'string', required: false, example: 'k@kryz.dev' })
  @IsOptional()
  @IsEmail()
  public email?: string;
}

export const UserModel = getModelForClass(User, { schemaOptions: { collection: 'users' } });
