import { Product } from '../entity/product';
import { ProductFactory } from './product.factory';

describe('Unit: Product Factory', () => {
  it('should create a product type a', () => {
    const product = ProductFactory.create('Product A', 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product A');
    expect(product.price).toBe(10);
    expect(product).toBeInstanceOf(Product);
  });
});
