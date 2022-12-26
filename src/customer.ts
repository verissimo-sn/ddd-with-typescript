export class Customer {
  private _id: string;
  private _name: string;
  private _address: string;
  private _active = false;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
    this.validate();
  }

  validate() {
    if (!this.name.length) {
      throw new Error('Name is required');
    }

    if (!this._id.length) {
      throw new Error('Id is required');
    }
  }

  activate() {
    if (!this._address.length) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
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

  get address() {
    return this._address;
  }

  changeAddress(address: string) {
    this._address = address;
    this.validate();
  }
}
