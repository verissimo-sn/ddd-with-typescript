import { Address } from '@domain/entity/address';
import { Customer } from '@domain/entity/customer';
import { ICustomerRepository } from '@domain/repository/customer-repository.interface';
import { CustomerModel } from '@infra/db/sequelize/model/customer.model';

export class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipCode: entity.address.zipCode,
      city: entity.address.city,
      country: entity.address.country,
      status: entity.status,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipCode: entity.address.zipCode,
        city: entity.address.city,
        country: entity.address.country,
        status: entity.status,
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer | null> {
    const foundCustomer = await CustomerModel.findOne({
      where: { id },
    });

    if (!foundCustomer) {
      return null;
    }

    const address = new Address(
      foundCustomer.street,
      foundCustomer.number,
      foundCustomer.zipCode,
      foundCustomer.city,
      foundCustomer.country
    );

    const customer = new Customer(
      foundCustomer.id,
      foundCustomer.name,
      address
    );

    if (foundCustomer.status) customer.activate();

    customer.addRewardPoints(foundCustomer.rewardPoints);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const allCustomers = await CustomerModel.findAll();

    return allCustomers.map((customerModel) => {
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipCode,
        customerModel.city,
        customerModel.country
      );
      const customer = new Customer(
        customerModel.id,
        customerModel.name,
        address
      );

      if (customerModel.status) customer.activate();

      customer.addRewardPoints(customerModel.rewardPoints);
      return customer;
    });
  }
}
