import { Sequelize } from 'sequelize-typescript';

import { Product } from '@domain/entity/product';

import { ProductModel } from '../db/sequelize/model/product.model';
import { ProductRepository } from './product.repositpry';

describe('Integration: Product repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product', 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product', 100);
    await productRepository.create(product);

    product.changeName('changed product');
    product.changePrice(200);

    await productRepository.update(product);

    const updatedProductModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(updatedProductModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product', 100);
    await productRepository.create(product);

    const foundProduct = await productRepository.find(product.id);

    expect(foundProduct?.id).toStrictEqual(product.id);
    expect(foundProduct?.name).toStrictEqual(product.name);
    expect(foundProduct?.price).toStrictEqual(product.price);
  });

  it('should return null when product is not found', async () => {
    const productRepository = new ProductRepository();

    const foundProduct = await productRepository.find('anyId');

    expect(foundProduct).toBe(null);
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product', 100);
    const product2 = new Product('2', 'produc2', 200);
    const products = [product, product2];
    await productRepository.create(product);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();

    expect(foundProducts).toEqual(products);
  });
});
