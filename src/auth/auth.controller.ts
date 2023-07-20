import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequest } from './dto/auth.dto';
import { Response } from 'express';
import { UserCreateReturn } from 'src/users/dto/users.return';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authLoginRequest: AuthLoginRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Omit<UserCreateReturn, 'password'>> {
    const { sessionId, ...user } = await this.authService.login(
      authLoginRequest,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    response.cookie('sessionId', sessionId, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return userWithoutPassword;
  }
}
