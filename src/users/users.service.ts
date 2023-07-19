import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateRequest } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { UserCreateReturn } from './dto/users.return';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(
    userCreateRequset: UserCreateRequest,
  ): Promise<UserCreateReturn> {
    const { email, password, nickname } = userCreateRequset;
    const isExistedEmail = await this.usersRepository.checkExistByEmail(email);
    const isExistedNickname = await this.usersRepository.checkExistByNickname(
      nickname,
    );

    if (isExistedEmail) {
      throw new HttpException('이미 존재하는 이메일입니다.', 400);
    }

    if (isExistedNickname) {
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      return await this.usersRepository.create({
        ...userCreateRequset,
        password: hashedPassword,
      });
    } catch (err) {
      throw new HttpException(`BCRYPT ERROR: ${err.message}`, 500);
    }
  }

  async getUser(userId: number): Promise<UserCreateReturn> {
    const isExistedId = await this.usersRepository.checkExistById(userId);
    if (!isExistedId) {
      throw new HttpException('존재하지 않는 유저입니다.', 404);
    }

    const { password, ...user } = await this.usersRepository.findOneById(
      userId,
    );

    return user;
  }
}
