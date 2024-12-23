import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';

describe('ProductService', () => {
  let service: ProductService;
  let model: Model<Product>;

  const mockProductModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([
        { name: 'Product1', price: 100 },
        { name: 'Product2', price: 200 },
      ]),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchAllProducts', () => {
    it('should return a list of products', async () => {
      const result = await service.fetchAllProducts();
      expect(result).toEqual([
        { name: 'Product1', price: 100 },
        { name: 'Product2', price: 200 },
      ]);
      expect(mockProductModel.find).toHaveBeenCalledTimes(1);
      expect(mockProductModel.find().exec).toHaveBeenCalledTimes(1);
    });
  });
});
