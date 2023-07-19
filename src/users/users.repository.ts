import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entity/users.entity';
import { UserCreateRequest } from './dto/users.dto';
import { UserCreateReturn } from './dto/users.return';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly Users: Repository<UsersEntity>,
  ) {}

  async create(
    userCreateRequest: UserCreateRequest,
  ): Promise<UserCreateReturn> {
    try {
      const insertedResult = await this.Users.createQueryBuilder()
        .insert()
        .values(userCreateRequest)
        .execute();

      const createdUserId = insertedResult.identifiers[0].id;

      return await this.findOneById(createdUserId);
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

  async findOneByEmail(email: string): Promise<any> {
    try {
      return await this.Users.createQueryBuilder()
        .select()
        .where('email = :email', { email })
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

  async checkExistByEmail(email: string): Promise<boolean> {
    try {
      return await this.Users.createQueryBuilder()
        .select()
        .where('email = :email', { email })
        .getExists();
    } catch (err) {
      throw new HttpException(`MYSQL ERROR: ${err.message}`, 500);
    }
  }

  async checkExistByNickname(nickname: string): Promise<boolean> {
    try {
      return await this.Users.createQueryBuilder()
        .select()
        .where('nickname = :nickname', { nickname })
        .getExists();
    } catch (err) {
      throw new HttpException(`MYSQL ERROR: ${err.message}`, 500);
    }
  }

  async checkExistById(id: number): Promise<boolean> {
    try {
      return await this.Users.createQueryBuilder()
        .select()
        .where('id = :id', { id })
        .getExists();
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
