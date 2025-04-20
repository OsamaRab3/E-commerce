import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

import { UserRole } from './user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  @IsString()
  @IsNotEmpty({ message: 'First Name is Required' })
  firstname: string;

  @Prop()
  @IsString()
  @IsNotEmpty({ message: 'Last Name is Required' })
  lastname: string;

  @Prop()
  @IsEmail({}, { message: 'Must be a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Prop({ select: false })
  @IsNotEmpty({ message: 'Password is Required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @Prop()
  // @IsPhoneNumber('US', { message: 'Phone Number must be valid' })
  @IsNotEmpty({ message: 'Phone Number is Required' })
  phone: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Order' }] })
  @IsOptional()
  orders: MongooseSchema.Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Cart' })
  @IsOptional()
  cart: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Wishlist' })
  @IsOptional()
  wishlist: MongooseSchema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
