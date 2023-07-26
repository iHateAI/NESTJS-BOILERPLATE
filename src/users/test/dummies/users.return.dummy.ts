import { UserCreateReturn } from 'src/users/dto/users.return';

export const UserCreateDummyReturn: UserCreateReturn = {
  id: 1,
  email: 'test@test.com',
  password: 'test1234',
  nickname: '테스트',
  gender: '남',
  createdAt: new Date('2023-03-05 16:25:04.871850'),
  updatedAt: new Date('2023-03-05 16:25:04.871850'),
};
