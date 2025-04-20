/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userModel.create(createUserDto);
      return await newUser.save();
    } catch (error) {
      console.log('Error fron create user: ', error);
      throw new Error('Error creating user: ', error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().lean();
      if (users.length === 0) {
        throw new Error('No users found');
      }
      return users;
    } catch (error) {
      console.log('Error from find all users', error);
      throw new Error('Error Find users: ', error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new Error('this user Not found ');
      }
      return user;
    } catch (error) {
      console.log('Error from find  user', error);
      throw new Error('Error Find user: ', error.message);
    }
  }
  async login(email: string): Promise<User> {
    try {
      const user = await this.userModel
        .findOne({ email })
        .select('+password')
        .lean();
      if (!user) {
        throw new Error('this user Not found ');
      }

      return user;
    } catch (error) {
      console.log('Error from find  user', error);
      throw new Error('Error Find user: ', error.message);
    }
  }
  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      console.log('Error from find user', error);
      throw new Error(`Error Find user from find by email: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      console.log('Error from update user: ', error);
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error('User not found');
      }
    } catch (error) {
      console.log('Error from remove user: ', error);
      throw new Error(`Error removing user: ${error.message}`);
    }
  }
}
