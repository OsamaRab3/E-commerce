import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsEnum,
  MinLength,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'First Name is required' })
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'Last Name is required' })
  lastname: string;

  @IsEmail({}, { message: 'Must be a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  // @IsPhoneNumber('US', { message: 'Must be a valid phone number' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsEnum(UserRole, { message: 'Role must be either "customer" or "admin"' })
  role: 'customer' | 'admin';
}
