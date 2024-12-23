import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

describe('UserService', () => {
  let userService: UserService;
  let mockUserModel: any;

  const mockEnv = {
    ATLAS_URL: 'http://mocked-atlas-url',
    ATLAS_API_KEY: 'mocked-api-key',
  };

  beforeAll(() => {
    process.env.ATLAS_URL = mockEnv.ATLAS_URL;
    process.env.ATLAS_API_KEY = mockEnv.ATLAS_API_KEY;
  });

  beforeEach(async () => {
    mockUserModel = {
      new: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findByStatus', () => {
    it('should return users with the specified status', async () => {
      const status = 'active';
      const mockUsers = [{ name: 'Jane Doe', status }];
      const findMock = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUsers),
      });

      // Replace the actual `find` method of the mock model
      (userService as any).userModel.find = findMock;

      const result = await userService.findByStatus(status);

      expect(findMock).toHaveBeenCalledWith({ status });
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ name: 'John Doe' }, { name: 'Jane Doe' }];

      // Mock the find method to return an object with exec
      const findMock = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUsers),
      });

      // Inject the mocked find method into userModel
      (userService as any).userModel.find = findMock;

      const result = await userService.findUsers();

      // Assert that find was called
      expect(findMock).toHaveBeenCalled();
      // Assert that the returned result matches the mock data
      expect(result).toEqual(mockUsers);
    });
  });
});
