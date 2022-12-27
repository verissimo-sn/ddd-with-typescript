import { Address } from './address';

export class Customer {
  private _id: string;
  private _name: string;
  private _rewardPoints = 0;
  private _address?: Address;
  private _active = false;

  constructor(id: string, name: string, address?: Address) {
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

  set address(address: Address) {
    this._address = address;
  }
}
