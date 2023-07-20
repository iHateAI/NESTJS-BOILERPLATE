import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateRequest } from './dto/users.dto';
import { UserCreateReturn } from './dto/users.return';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: '유저 데이터 생성 API',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 201,
    description: '유저 데이터 생성 및 해당 데이터 반환',
    type: UserCreateReturn,
  })
  createUser(
    @Body() userCreateRequest: UserCreateRequest,
  ): Promise<UserCreateReturn> {
    return this.usersService.createUser(userCreateRequest);
  }

  @Get(':userId')
  @ApiOperation({
    summary: '유저 데이터 조회 API',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 200,
    description: '유저 식별 아이디에 해당하는 데이터 반환',
    type: UserCreateReturn,
  })
  getUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Omit<UserCreateReturn, 'password'>> {
    return this.usersService.getUser(userId);
  }
}
