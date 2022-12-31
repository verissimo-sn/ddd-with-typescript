import { IProduct } from './product.interface';

export class Product implements IProduct {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate() {
    if (!this._id.length) {
      throw new Error('Id is required');
    }

    if (!this._name.length) {
      throw new Error('Name is required');
    }

    if (this._price <= 0) {
      throw new Error('Price should greater than 0');
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get price() {
    return this._price;
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
