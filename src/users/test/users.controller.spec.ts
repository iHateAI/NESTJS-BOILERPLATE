import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UserCreateDummyDto } from './dummies/users.dto.dummy';
import { UserCreateDummyReturn } from './dummies/users.return.dummy';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/test/auth.guard.mock';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: { createUser: jest.fn(() => UserCreateDummyReturn) },
        },
      ],
    }).compile();
    // .overrideGuard(AuthGuard)
    // .useValue(mockAuthGuard())
    // .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  // describe('CreateUser', () => {
  //   it('SUCCESS: 새로운 유저 데이터 생성', async () => {
  //     const userDto = UserCreateDummyDto;
  //     const userReturn = UserCreateDummyReturn;
  //     const result = await usersController.createUser(userDto);

  //     expect(result).toStrictEqual(userReturn);
  //     expect(usersService.createUser).toBeCalledTimes(1);
  //     expect(usersService.createUser).toBeCalledWith(userDto);
  //   });
  // });
});
