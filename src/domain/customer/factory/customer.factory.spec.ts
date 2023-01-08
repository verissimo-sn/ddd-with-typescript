import { Customer } from '../entity/customer';
import { Address } from '../values-object/address';
import { AddressFactoryType, CustomerFactory } from './customer.factory';

describe('Unit: Customer Factory', () => {
  it('should create a Customer', () => {
    const customer = CustomerFactory.create('Customer');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Customer');
    expect(customer).toBeInstanceOf(Customer);
  });

  it('should create a Customer with address', () => {
    const address: AddressFactoryType = {
      street: 'street',
      number: 10,
      zipCode: 1234,
      city: 'city',
      country: 'country',
    };

    const customer = CustomerFactory.createWithAddress('Customer', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Customer');
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.address).toBeInstanceOf(Address);
    expect(customer.address.street).toStrictEqual(address.street);
    expect(customer.address.number).toStrictEqual(address.number);
    expect(customer.address.zipCode).toStrictEqual(address.zipCode);
    expect(customer.address.city).toStrictEqual(address.city);
    expect(customer.address.country).toStrictEqual(address.country);
  });
});
