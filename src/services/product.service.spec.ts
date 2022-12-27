import { Product } from '../entity/product';
import { ProductService } from './product.service';

describe('Unit: Product service', () => {
  it('should change the price of all products', () => {
    const product1 = new Product('i1', 'p1', 20);
    const product2 = new Product('i2', 'p2', 40);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(40);
    expect(product2.price).toBe(80);
  });
});
