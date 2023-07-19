import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

enum Gender {
  male = '남',
  female = '여',
}

export class UserCreateRequest {
  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  readonly email: string;

  @ApiProperty({
    example: 'kdfjw3as902e',
    description: '유저 패스워드',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly password: string;

  @ApiProperty({
    example: '테스트',
    description: '유저 닉네임',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  readonly nickname: string;

  @ApiProperty({
    example: '남',
    description: '유저 성별',
    required: true,
  })
  @IsEnum(Gender)
  @IsString()
  @IsNotEmpty()
  readonly gender: string;
}
