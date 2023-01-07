import { IRepository } from '@domain/@shared/repository/repository.interface';

import { Customer } from '../entity/customer';

export interface ICustomerRepository extends IRepository<Customer> { }