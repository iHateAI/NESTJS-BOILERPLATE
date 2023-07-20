import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequest } from './dto/auth.dto';
import { Request, Response } from 'express';
import { UserCreateReturn } from 'src/users/dto/users.return';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: '로그인 API',
    tags: ['Auth'],
  })
  @ApiResponse({
    status: 201,
    description: '로그인 및 세션 생성',
    type: UserCreateReturn,
  })
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

  @Post('logout')
  @ApiOperation({
    summary: '로그아웃 API',
    tags: ['Auth'],
  })
  @ApiResponse({
    status: 201,
    description: '로그아웃 및 세션 삭제',
  })
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const cookie = req.headers.cookie;
    const sessionId = cookie?.split('=')[1];
    const { deletedCount } = await this.authService.logout(sessionId);

    res.clearCookie('sessionId', { path: '/', httpOnly: true });
    res.json({
      success: true,
      timeStamp: new Date().toISOString(),
      result: {
        deletedCount,
      },
    });
  }
}
