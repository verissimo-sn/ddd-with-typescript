import { Order } from './order';
import { OrderItem } from './order-item';

describe('Unit: Order Entity', () => {
  const item1 = new OrderItem('id1', 'item 1', 'productId', 10, 2);
  const item2 = new OrderItem('id2', 'item 2', 'productId', 20, 3);

  it('should create a Order correctly', () => {
    const fakeOrder = new Order('fakeId', 'customerId', [item1, item2]);

    expect(fakeOrder.id).toStrictEqual('fakeId');
    expect(fakeOrder.customerId).toEqual('customerId');
    expect(fakeOrder.items.length).toEqual(2);
  });

  it('should throw error when id, customerId or item is empty', () => {
    expect(() => {
      const fakeOrder = new Order('', 'customerId', [item1, item2]);
    }).toThrowError('Id is required');
    expect(() => {
      const fakeOrder = new Order('fakeId', '', [item1, item2]);
    }).toThrowError('CustomerId is required');
    expect(() => {
      const fakeOrder = new Order('fakeId', 'customerId', []);
    }).toThrowError('Items is required');
  });

  it('should calculate total correctly', () => {
    const fakeOrder = new Order('orderID', 'customerId', [item1, item2]);

    expect(fakeOrder.total()).toBe(80);
  });
});
