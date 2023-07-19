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
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  readonly nickname: string;

  @IsEnum(Gender)
  @IsString()
  @IsNotEmpty()
  readonly gender: string;
}
