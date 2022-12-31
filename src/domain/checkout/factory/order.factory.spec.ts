import { Order } from '../entity/order';
import { OrderItem } from '../entity/order-item';
import { OrderFactory, OrderFactoryType } from './order.factory';

describe('Unit: Order Factory', () => {
  it('should create an Order', () => {
    const orderFactoryProps: OrderFactoryType = {
      customerId: 'customerId',
      items: [
        {
          name: 'order-item',
          productId: 'productID',
          quantity: 1,
          price: 1,
        },
      ],
    };

    const order = OrderFactory.create(orderFactoryProps);

    expect(order.id).toBeDefined();
    expect(order.customerId).toBe(orderFactoryProps.customerId);
    expect(order).toBeInstanceOf(Order);
    expect(order.items[0]).toBeInstanceOf(OrderItem);
    expect(order.items[0].id).toBeDefined();
    expect(order.items[0].name).toBe(orderFactoryProps.items[0].name);
    expect(order.items[0].productId).toBe(orderFactoryProps.items[0].productId);
    expect(order.items[0].quantity).toBe(orderFactoryProps.items[0].quantity);
    expect(order.items[0].price).toBe(orderFactoryProps.items[0].price);
  });
});
