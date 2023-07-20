import { HttpException, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { AuthLogoutReturn } from './dto/auth.return';

@Injectable()
export class AuthRepository {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient('session');
  }

  async createSession(sessionId: string, userId: number): Promise<void> {
    try {
      await this.redis.set(sessionId, userId.toString());
      // 숫자 순서대로 초, 분, 시, 일 (7일간 DB에 보관 이후 자동 삭제)
      await this.redis.expire(userId.toString(), 60 * 60 * 24 * 7);
    } catch (err) {
      throw new HttpException(`세션 저장 실패: ${err.message}`, 500);
    }
  }

  async findSessionBySessionId(sessionId: string): Promise<string> {
    try {
      return await this.redis.get(sessionId);
    } catch (err) {
      throw new HttpException(`세션 불러오기 실패: ${err.message}`, 500);
    }
  }

  async deleteSession(sessionId: string): Promise<AuthLogoutReturn> {
    try {
      const deletedCount = await this.redis.del(sessionId);
      return { deletedCount };
    } catch (err) {
      throw new HttpException(`세션 삭제 실패: ${err.message}`, 500);
    }
  }
}
