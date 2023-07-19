import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entity/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly Users: Repository<UsersEntity>,
  ) {}

  async create(userCreateRequest: any): Promise<any> {
    try {
      await this.Users.createQueryBuilder()
        .insert()
        .values(userCreateRequest)
        .execute();
    } catch (err) {
      throw new HttpException(`MYSQL ERROR: ${err.message}`, 500);
    }
  }

  async findOneById(id: number): Promise<any> {
    try {
      return await this.Users.createQueryBuilder()
        .select()
        .where('id = :id', { id })
        .getOne();
    } catch (err) {
      throw new HttpException(`MYSQL ERROR: ${err.message}`, 500);
    }
  }

  async findAll(): Promise<any> {
    try {
      return await this.Users.createQueryBuilder().select().getMany();
    } catch (err) {
      throw new HttpException(`MYSQL ERROR: ${err.message}`, 500);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      return await this.Users.createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
    } catch (err) {
      throw new HttpException(`MYSQL ERROR: ${err.message}`, 500);
    }
  }
}
