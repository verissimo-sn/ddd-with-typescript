import { randomUUID } from 'crypto';

import { Order } from '../entity/order';
import { OrderItem } from '../entity/order-item';
import { IOrder } from '../entity/order.interface';

export type OrderFactoryType = {
  customerId: string;
  items: {
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
};

export class OrderFactory {
  static create(options: OrderFactoryType): IOrder {
    const items = options.items.map(
      (item) =>
        new OrderItem(
          randomUUID(),
          item.name,
          item.productId,
          item.price,
          item.quantity
        )
    );

    return new Order(randomUUID(), options.customerId, items);
  }
}
