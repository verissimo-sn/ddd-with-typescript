import { ICustomerRepository } from "@domain/customer/repository/customer-repository.interface";
import { IUseCase } from "../../@shared/useCase/use-case.interface";
import { InputCreateCustomer, OutputCreateCustomer } from "./create-customer.dto";

import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { Customer } from "@domain/customer/entity/customer";

export class CreateCustomerUseCase implements IUseCase<InputCreateCustomer, OutputCreateCustomer> {
  constructor(private readonly customerRepository: ICustomerRepository) { }

  async execute(input: InputCreateCustomer): Promise<OutputCreateCustomer> {
    const customer = CustomerFactory.createWithAddress(input.name, {
      street: input.address.street,
      number: input.address.number,
      zipCode: input.address.zipCode,
      city: input.address.city,
      country: input.address.country
    });

    await this.customerRepository.create(customer);

    return {
      id: customer.id
    }
  }
}