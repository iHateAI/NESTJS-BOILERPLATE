import { IsEnum, IsEmail, IsString, IsNotEmpty } from 'class-validator';

enum Gender {
  male = '남',
  female = '여',
}

export class UserCreateRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: string;
}
