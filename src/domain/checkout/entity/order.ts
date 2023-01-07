import { OrderItem } from './order-item';

export class Order {
  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[]
  ) {
    this.validate();
  }

  total() {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }

  validate() {
    if (!this._id.length) {
      throw new Error('Id is required');
    }

    if (!this._customerId.length) {
      throw new Error('CustomerId is required');
    }

    if (!this._items.length) {
      throw new Error('Items is required');
    }
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items() {
    return this._items;
  }
}
