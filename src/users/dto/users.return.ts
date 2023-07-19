import { ApiProperty } from '@nestjs/swagger';

export class UserCreateReturn {
  @ApiProperty({
    example: 1,
    description: '유저 데이터 식별 아이디',
  })
  id: number;

  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
  })
  email: string;

  @ApiProperty({
    example: 'kdfjw3as902e',
    description: '유저 패스워드',
  })
  password: string;

  @ApiProperty({
    example: '테스트',
    description: '유저 닉네임',
  })
  nickname: string;

  @ApiProperty({
    example: '남',
    description: '유저 성별',
  })
  gender: string;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '데이터 생성 일자',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '데이터 수정 일자',
  })
  updatedAt: Date;
}
