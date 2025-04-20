import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { password, email } = createUserDto;

    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashPassword: string = await bcrypt.hash(password, 10);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
    });

    return user;
  }

  async login(email: string, password: string): Promise<User> {
    const existingUser = await this.userService.login(email);

    if (!existingUser) {
      throw new BadRequestException('Email or Password Not correct');
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new BadRequestException('Email or Password Not correct');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (existingUser as any).password;
    return existingUser;
  }
}
