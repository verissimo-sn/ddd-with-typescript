import { randomUUID } from 'crypto';

import { Product } from '../entity/product';
import { IProduct } from '../entity/product.interface';

export class ProductFactory {
  static create(name: string, price: number): IProduct {
    return new Product(randomUUID(), name, price);
  }
}
