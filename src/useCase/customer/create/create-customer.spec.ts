import { Sequelize } from 'sequelize-typescript';

import { Customer } from '@domain/customer/entity/customer';
import { Address } from '@domain/customer/values-object/address';
import { CustomerModel } from '@infra/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository';
import { CreateCustomerUseCase } from './create-customer.usecase';
import { InputCreateCustomer, OutputCreateCustomer } from './create-customer.dto';

describe('Integration: create customer UseCase', () => {
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

  it('should create a new customer ', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input: InputCreateCustomer = {
      name: 'name',
      address: {
        street: 'street',
        number: 123,
        zipCode: 12345,
        city: "city",
        country: 'country'
      }
    };

    const expectedOutput: OutputCreateCustomer = {
      id: expect.any(String),
    }
    const result = await useCase.execute(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should throw error when customer not found', async () => {
    // const customerRepository = new CustomerRepository();
    // jest.spyOn(customerRepository, 'find').mockImplementationOnce(() => {
    //   return Promise.resolve(null);
    // })
    // const useCase = new FindCustomerUseCase(customerRepository);

    // const input: InputFindCustomer = {
    //   id: 'fake id',
    // };

    // expect(async () => {
    //   await useCase.execute(input);
    // }).rejects.toThrow('Consumer not found');
  });
});
