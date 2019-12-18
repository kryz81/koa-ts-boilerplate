import { getModelForClass, prop } from '@typegoose/typegoose';
import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Role } from './Role';

@swaggerClass()
export class User {
  @prop({ required: false })
  public _id?: string;

  @prop({ required: true })
  @swaggerProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @Length(3)
  public name!: string;

  @prop({ required: true })
  @swaggerProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsEnum(Role)
  public role!: string;

  @prop({ required: false })
  @swaggerProperty({ type: 'string', required: false })
  @IsOptional()
  @IsEmail()
  public email?: string;
}

export const UserModel = getModelForClass(User, { schemaOptions: { collection: 'users' } });
