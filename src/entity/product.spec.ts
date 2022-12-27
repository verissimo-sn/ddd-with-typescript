import { Product } from './product';

describe('Unit: Product Entity', () => {
  it('should create a Product correctly', () => {
    const fakeProduct = new Product('fakeId', 'name', 20);

    expect(fakeProduct.id).toStrictEqual('fakeId');
    expect(fakeProduct.name).toEqual('name');
    expect(fakeProduct.price).toEqual(20);
  });

  it('should throw error when id, customerId or item is empty or invalid', () => {
    expect(() => {
      const fakeProduct = new Product('', 'name', 10);
    }).toThrowError('Id is required');
    expect(() => {
      const fakeProduct = new Product('fakeId', '', 20);
    }).toThrowError('Name is required');
    expect(() => {
      const fakeProduct = new Product('fakeId', 'customerId', 0);
    }).toThrowError('Price should greater than 0');
  });

  it('should change name correctly', () => {
    const fakeProduct = new Product('fakeId', 'name', 20);
    fakeProduct.changeName('changed name');

    expect(fakeProduct.name).toEqual('changed name');
  });

  it('should throw error when name is empty on change name', () => {
    const fakeProduct = new Product('fakeId', 'name', 20);

    expect(() => fakeProduct.changeName('')).toThrowError('Name is required');
  });
});
