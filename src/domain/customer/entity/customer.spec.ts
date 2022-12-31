import { Address } from '../values-object/address';
import { Customer } from './customer';

describe('Unit: Customer Entity', () => {
  it('should create Customer correctly', () => {
    const fakeCustomer = new Customer('1234', 'Customer 1');

    expect(fakeCustomer.id).toStrictEqual('1234');
    expect(fakeCustomer.name).toStrictEqual('Customer 1');
    expect(fakeCustomer.address).toBeFalsy();
    expect(fakeCustomer.status).toBe(false);
  });

  it('should throw error when id or name is empty', () => {
    expect(() => {
      const fakeCustomer = new Customer('', 'Customer 1');
    }).toThrowError('Id is required');

    expect(() => {
      const fakeCustomer = new Customer('123', '');
    }).toThrowError('Name is required');
  });

  it('should change name correctly', () => {
    const fakeCustomer = new Customer('123', 'Customer 1');
    fakeCustomer.changeName('changed name');

    expect(fakeCustomer.name).toEqual('changed name');
  });

  it('should change address correctly', () => {
    const fakeCustomer = new Customer('123', 'Customer 1');
    const fakeAddress = new Address('street', 123, 123, 'city', 'country');
    fakeCustomer.changeAddress(fakeAddress);

    expect(fakeCustomer.address).toStrictEqual(fakeAddress);
  });

  it('should throw error when try activate customer and address is empty', () => {
    const fakeCustomer = new Customer('123', 'Customer 1');

    expect(() => fakeCustomer.activate()).toThrowError(
      'Address is mandatory to activate a customer'
    );
  });

  it('should activate customer correctly', () => {
    const fakeCustomer = new Customer('123', 'Customer 1');
    const fakeAddress = new Address('street', 123, 123, 'city', 'country');
    fakeCustomer.changeAddress(fakeAddress);
    fakeCustomer.activate();

    expect(fakeCustomer.status).toBe(true);
  });

  it('should deactivate customer correctly', () => {
    const fakeCustomer = new Customer('123', 'Customer 1');
    const fakeAddress = new Address('street', 123, 123, 'city', 'country');
    fakeCustomer.changeAddress(fakeAddress);
    fakeCustomer.activate();
    expect(fakeCustomer.status).toBe(true);
    fakeCustomer.deactivate();
    expect(fakeCustomer.status).toBe(false);
  });

  it('should set rewardPoints correctly', () => {
    const fakeCustomer = new Customer('123', 'Customer 1');
    const fakeAddress = new Address('street', 123, 123, 'city', 'country');
    fakeCustomer.changeAddress(fakeAddress);
    fakeCustomer.addRewardPoints(20);
    expect(fakeCustomer.rewardPoints).toBe(20);
    fakeCustomer.addRewardPoints(20);
    expect(fakeCustomer.rewardPoints).toBe(40);
  });
});
