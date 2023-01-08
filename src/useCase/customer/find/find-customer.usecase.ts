import { ICustomerRepository } from '@domain/customer/repository/customer-repository.interface';
import { IUseCase } from '../../@shared/useCase/use-case.interface';

import { InputFindCustomer, OutputFindCustomer } from './find-customer.dto';

export class FindCustomerUseCase
  implements IUseCase<InputFindCustomer, OutputFindCustomer>
{
  constructor(private readonly customerRepository: ICustomerRepository) { }

  async execute(input: InputFindCustomer): Promise<OutputFindCustomer> {
    const result = await this.customerRepository.find(input.id);

    if (!result) throw new Error('Consumer not found');

    return {
      id: result.id,
      name: result.name,
      address: {
        street: result.address.street,
        number: result.address.number,
        city: result.address.city,
        zipCode: result.address.zipCode,
        country: result.address.country,
      },
    };
  }
}
