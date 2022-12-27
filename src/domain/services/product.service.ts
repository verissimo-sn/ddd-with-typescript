import { Product } from '../entity/product';

export class ProductService {
  static increasePrice(products: Product[], percents: number): void {
    products.forEach((product) => {
      const changedPrice = (product.price * percents) / 100 + product.price;
      product.changePrice(changedPrice);
    });
  }
}
