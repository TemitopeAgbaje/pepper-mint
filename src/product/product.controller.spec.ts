import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe.only('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  const mockProductService = {
    fetchAllProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('fetchProducts', () => {
    it('should call ProductService.fetchAllProducts and return the result', async () => {
      const mockProducts = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
      ];
      mockProductService.fetchAllProducts.mockResolvedValue(mockProducts);

      const result = await productController.fetchProducts();

      expect(productService.fetchAllProducts).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });
});
