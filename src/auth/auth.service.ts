import { HttpException, Injectable } from '@nestjs/common';
import { AuthLoginRequest } from './dto/auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import { AuthRepository } from './auth.repository';
import { AuthLoginReturn } from './dto/auth.return';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(authLoginRequest: AuthLoginRequest): Promise<AuthLoginReturn> {
    const { email, password } = authLoginRequest;
    const isExistedEmail = await this.usersRepository.checkExistByEmail(email);

    if (!isExistedEmail) {
      throw new HttpException('존재하지 않는 이메일입니다.', 400);
    }

    const user = await this.usersRepository.findOneByEmail(email);

    try {
      await bcrypt.compare(password, user.password);
    } catch (err) {
      throw new HttpException('비밀번호가 일치하지 않습니다.', 400);
    }

    const sessionId = this.generateSessionId();
    await this.authRepository.createSession(user.id, sessionId);

    return {
      sessionId,
      ...user,
    };
  }

  generateSessionId(): string {
    return uuid();
  }
}
