import { randomUUID } from 'crypto';

import { Customer } from '../entity/customer';
import { Order } from '../entity/order';
import { OrderItem } from '../entity/order_item';

export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => {
      return acc + order.total();
    }, 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!items.length) {
      throw new Error('Order must have at list of items');
    }

    const id = randomUUID();
    const order = new Order(id, customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}
