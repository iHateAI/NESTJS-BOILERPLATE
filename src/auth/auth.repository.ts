import { HttpException, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AuthRepository {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient('session');
  }

  async createSession(userId: number, sessionId: string) {
    try {
      await this.redis.set(userId.toString(), sessionId);
      // 숫자 순서대로 초, 분, 시, 일 (7일간 DB에 보관 이후 자동 삭제)
      await this.redis.expire(userId.toString(), 60 * 60 * 24 * 7);
    } catch (err) {
      throw new HttpException(`세션저장실패: ${err.message}`, 500);
    }
  }
}
