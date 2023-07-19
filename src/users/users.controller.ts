import { Controller, Post, Body } from '@nestjs/common';
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
}
