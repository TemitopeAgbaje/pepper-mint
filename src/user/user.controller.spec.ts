import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
// import { User } from '../schemas/user.schema';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    findByStatus: jest.fn(),
    findUsers: jest.fn(),
    addUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUsersByStatus', () => {
    it('should return a message if status query parameter is missing', async () => {
      const result = await userController.getUsersByStatus(null);
      expect(result).toEqual({ message: 'Status query parameter is required' });
    });

    it('should call userService.findByStatus with the correct status', async () => {
      const status = 'active';
      const mockUsers = [{ name: 'John Doe', status }];
      mockUserService.findByStatus.mockResolvedValue(mockUsers);

      const result = await userController.getUsersByStatus(status);
      expect(mockUserService.findByStatus).toHaveBeenCalledWith(status);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUser', () => {
    it('should return all users', async () => {
      const mockUsers = [{ name: 'Jane Doe' }, { name: 'John Doe' }];
      mockUserService.findUsers.mockResolvedValue(mockUsers);

      const result = await userController.getUser();
      expect(mockUserService.findUsers).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('addUser', () => {
    it('should add a new user and return the user object', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Jane Doe',
        email: 'jane@test.com',
        status: 'active',
      };
      const mockUser = { _id: '123', ...createUserDto };
      mockUserService.addUser.mockResolvedValue(mockUser);

      const result = await userController.addUser(createUserDto);
      expect(mockUserService.addUser).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });
});
