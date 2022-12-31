import { Product } from '@domain/product/entity/product';
import { IProductRepository } from '@domain/product/repository/product-repository.interface';

import { ProductModel } from './product.model';

export class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Product | null> {
    const productModel = await ProductModel.findOne({ where: { id } });
    return productModel
      ? new Product(productModel.id, productModel.name, productModel.price)
      : null;
  }

  async findAll(): Promise<Product[]> {
    const productModel = await ProductModel.findAll();

    return productModel.map((product) => {
      return new Product(product.id, product.name, product.price);
    });
  }
}
