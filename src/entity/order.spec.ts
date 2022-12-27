import { Order } from './order';
import { OrderItem } from './order_item';

describe('Unit: Order Entity', () => {
  it('should create a Order correctly', () => {
    const item1 = new OrderItem('id1', 'item 1', 10);
    const item2 = new OrderItem('id2', 'item 2', 20);
    const fakeOrder = new Order('fakeId', 'customerId', [item1, item2]);

    expect(fakeOrder.id).toStrictEqual('fakeId');
    expect(fakeOrder.customerId).toEqual('customerId');
    expect(fakeOrder.items.length).toEqual(2);
  });

  it('should throw error when id, customerId or item is empty', () => {
    const item1 = new OrderItem('id1', 'item 1', 10);
    const item2 = new OrderItem('id2', 'item 2', 20);

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
    const item1 = new OrderItem('id1', 'item 1', 10);
    const item2 = new OrderItem('id2', 'item 2', 20);
    const fakeOrder = new Order('orderID', 'customerId', [item1, item2]);

    expect(fakeOrder.total()).toBe(30);
  });
});
