import { OrderItem } from './order_item';

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
  }

  validate() {
    if (!this._id.length) {
      throw new Error('Id is required');
    }

    if (!this._customerId.length) {
      throw new Error('Name is required');
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
