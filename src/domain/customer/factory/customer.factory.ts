import { randomUUID } from 'crypto';

import { Customer } from '../entity/customer';
import { ICustomer } from '../entity/customer.interface';
import { Address } from '../values-object/address';

export type AddressFactoryType = {
  street: string;
  number: number;
  zipCode: number;
  city: string;
  country: string;
};

export class CustomerFactory {
  static create(name: string): ICustomer {
    return new Customer(randomUUID(), name);
  }

  static createWithAddress(
    name: string,
    address: AddressFactoryType
  ): ICustomer {
    const newAddress = new Address(
      address.street,
      address.number,
      address.zipCode,
      address.city,
      address.country
    );
    return new Customer(randomUUID(), name, newAddress);
  }
}
