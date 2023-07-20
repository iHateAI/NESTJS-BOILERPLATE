import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const cookie = req.headers.cookie;
    const sessionId = cookie?.split('=')[1];
    if (!sessionId) {
      throw new HttpException('세션이 존재하지 않습니다. 로그인 하세요.', 403);
    }

    const session = await this.authService.getSession(sessionId);
    if (!session) {
      throw new HttpException('DB에 세션이 존재하지 않습니다.', 403);
    }

    return true;
  }
}
