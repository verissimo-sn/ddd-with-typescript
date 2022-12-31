import { Sequelize } from 'sequelize-typescript';

import { Customer } from '@domain/customer/entity/customer';
import { Address } from '@domain/customer/values-object/address';

import { CustomerModel } from './customer.model';
import { CustomerRepository } from './customer.repository';

describe('Integration: Customer repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a Customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('street', 1234, 1234, 'city', 'country');
    const customer = new Customer('c1', 'Customer 1', address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customerModel?.id,
      name: customerModel?.name,
      street: customerModel?.street,
      number: customerModel?.number,
      zipCode: customerModel?.zipCode,
      city: customerModel?.city,
      country: customerModel?.country,
      status: customerModel?.status,
      rewardPoints: customerModel?.rewardPoints,
    });
  });

  it('should update a Customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('street', 1234, 1234, 'city', 'country');
    const customer = new Customer('c1', 'Customer 1', address);
    await customerRepository.create(customer);

    const newAddress = new Address(
      'new street',
      4321,
      4321,
      'new city',
      'new country'
    );
    customer.changeName('changed customer');
    customer.changeAddress(newAddress);

    await customerRepository.update(customer);

    const updatedCustomerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(updatedCustomerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: newAddress.street,
      city: newAddress.city,
      country: newAddress.country,
      number: newAddress.number,
      rewardPoints: customer.rewardPoints,
      status: customer.status,
      zipCode: newAddress.zipCode,
    });
  });

  it('should find a Customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('street', 1234, 1234, 'city', 'country');
    const customer = new Customer('c1', 'Customer 1', address);
    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find(customer.id);

    expect(foundCustomer?.id).toStrictEqual(customer.id);
    expect(foundCustomer?.name).toStrictEqual(customer.name);
    expect(foundCustomer?.address).toStrictEqual(customer.address);
  });

  it('should return null when Customer is not found', async () => {
    const customerRepository = new CustomerRepository();

    const foundCustomer = await customerRepository.find('anyId');

    expect(foundCustomer).toBe(null);
  });

  it('should find all Customers', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('street', 1234, 1234, 'city', 'country');
    const customer1 = new Customer('c1', 'Customer 1', address);
    const customer2 = new Customer('c2', 'Customer 2', address);

    const customers = [customer1, customer2];
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();

    expect(foundCustomers).toEqual(customers);
  });
});
