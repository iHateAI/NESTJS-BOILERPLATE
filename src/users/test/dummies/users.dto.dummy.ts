import { UserCreateRequest } from 'src/users/dto/users.dto';

export const UserCreateDummyDto: UserCreateRequest = {
  email: 'test@test.com',
  password: 'test1234',
  nickname: '테스트',
  gender: '남',
};
