import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateRequest } from './dto/users.dto';
import { UserCreateReturn } from './dto/users.return';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body() userCreateRequest: UserCreateRequest,
  ): Promise<UserCreateReturn> {
    return this.usersService.createUser(userCreateRequest);
  }

  @Get(':userId')
  getUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Omit<UserCreateReturn, 'password'>> {
    return this.usersService.getUser(userId);
  }
}
