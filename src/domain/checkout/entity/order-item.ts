export class OrderItem {
  constructor(
    protected _id: string,
    protected _name: string,
    protected _productId: string,
    protected _price: number,
    protected _quantity: number
  ) {
    this.validate();
  }

  validate() {
    if (!this._id.length) {
      throw new Error('Id is required');
    }

    if (!this._name.length) {
      throw new Error('Name is required');
    }

    if (!this._productId) {
      throw new Error('ProductId is required');
    }

    if (this._price <= 0) {
      throw new Error('Price should greater then 0');
    }

    if (this._quantity <= 0) {
      throw new Error('Quantity should greater then 0');
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get productId() {
    return this._productId;
  }

  get price() {
    return this._price * this._quantity;
  }

  get quantity() {
    return this._quantity;
  }
}
