import { Sequelize } from 'sequelize-typescript';

import { Customer } from '@domain/customer/entity/customer';
import { Address } from '@domain/customer/values-object/address';
import { CustomerModel } from '@infra/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository';

import { InputFindCustomer, OutputFindCustomer } from './find-customer.dto';
import { FindCustomerUseCase } from './find-customer.usecase';

describe('Integration: Find customer UseCase', () => {
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

  it('should find a customer ', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('street', 123, 12345, 'city', 'country');
    const customer = new Customer('1', 'Customer 1', address);

    const useCase = new FindCustomerUseCase(customerRepository);

    await customerRepository.create(customer);

    const input: InputFindCustomer = {
      id: customer.id,
    };

    const result = await useCase.execute(input);

    const expectedOutput: OutputFindCustomer = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zipCode: customer.address.zipCode,
        country: customer.address.country,
      },
    };

    expect(result).toStrictEqual(expectedOutput);
  });

  it('should throw error when customer not found', async () => {
    const customerRepository = new CustomerRepository();
    jest.spyOn(customerRepository, 'find').mockImplementationOnce(() => {
      return Promise.resolve(null);
    })
    const useCase = new FindCustomerUseCase(customerRepository);

    const input: InputFindCustomer = {
      id: 'fake id',
    };

    expect(async () => {
      await useCase.execute(input);
    }).rejects.toThrow('Consumer not found');
  });
});
