import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateRequest } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() userCreateRequest: UserCreateRequest): any {
    return this.usersService.createUser(userCreateRequest);
  }
}
