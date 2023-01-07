import { Address } from '../values-object/address';
import { ICustomer } from './customer.interface';

export class Customer implements ICustomer {
  private _rewardPoints = 0;
  private _active = false;

  constructor(
    private _id: string,
    private _name: string,
    private _address?: Address
  ) {
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
    if (!this._address) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  get status() {
    return this._active;
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

  get rewardPoints() {
    return this._rewardPoints;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get address() {
    return this._address as Address;
  }

  changeAddress(address: Address) {
    this._address = address;
  }
}