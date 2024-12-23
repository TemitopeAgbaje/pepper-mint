import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './create-user.dto';

dotenv.config();

@Injectable()
export class UserService {
  private readonly atlasUrl = process.env.ATLAS_URL;
  private readonly apiKey = process.env.ATLAS_API_KEY;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async fetchUsersByStatus(status: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.atlasUrl}/fetchUsersByStatus`,
        {
          arguments: [status],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': this.apiKey,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(this.atlasUrl);
      if (error.response) {
        console.error('Error details:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      }
      throw new HttpException(
        `Error fetching users: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Fetch users by status
  async findByStatus(status: string): Promise<User[]> {
    return this.userModel.find({ status }).exec();
  }

  async findUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Add a new user
  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }
}
