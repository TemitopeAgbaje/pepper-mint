import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  //   UsePipes,
  //   ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from 'src/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsersByStatus(@Query('status') status: string) {
    if (!status) {
      return { message: 'Status query parameter is required' };
    }
    return this.userService.findByStatus(status);
  }

  @Get('/all')
  async getUser() {
    return this.userService.findUsers();
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.addUser(createUserDto);
  }
}
