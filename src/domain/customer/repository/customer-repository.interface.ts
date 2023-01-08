import { IRepository } from '@domain/@shared/repository/repository.interface';

import { ICustomer } from '../entity/customer.interface';

export interface ICustomerRepository extends IRepository<ICustomer> { }
