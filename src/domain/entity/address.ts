export class Address {
  private _street: string;
  private _number: number;
  private _zipCode: number;
  private _city: string;
  private _country: string;

  constructor(
    street: string,
    number: number,
    zipCode: number,
    city: string,
    country: string
  ) {
    this._street = street;
    this._number = number;
    this._zipCode = zipCode;
    this._city = city;
    this._country = country;

    this.validate();
  }

  validate(): void {
    if (!this._street.length) {
      throw new Error('Street is required');
    }
    if (!this._number) {
      throw new Error('Number is required');
    }
    if (!this._zipCode) {
      throw new Error('Zip Code is required');
    }
    if (!this._city.length) {
      throw new Error('City is required');
    }
    if (!this._country.length) {
      throw new Error('Country is required');
    }
  }

  toString(): string {
    return `${this._street}, ${this._number}, ${this._zipCode}, ${this._city}, ${this._country}`;
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get zipCode() {
    return this._zipCode;
  }

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }
}
