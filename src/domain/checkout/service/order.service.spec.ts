import { Customer } from '@domain/customer/entity/customer';

import { Order } from '../entity/order';
import { OrderItem } from '../entity/order-item';
import { OrderService } from './order.service';

describe('Unit: Order service', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'customer');
    const item = new OrderItem('i1', 'order item', '1234', 10, 5);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(25);
    expect(order.total()).toBe(50);
  });

  it('should get total of all orders', () => {
    const item1 = new OrderItem('i1', 'order1', '123', 10, 1);
    const item2 = new OrderItem('i2', 'order2', '123', 20, 2);

    const order1 = new Order('123', 'customer', [item1]);
    const order2 = new Order('123', 'customer', [item2]);

    const response = OrderService.total([order1, order2]);

    expect(response).toBe(50);
  });
});
