import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthLoginRequest {
  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    example: 'kdfjw3as902e',
    description: '유저 패스워드',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly password: string;
}
