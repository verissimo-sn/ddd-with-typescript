/* eslint-disable @typescript-eslint/no-empty-interface */
import { Customer } from '@domain/entity/customer';

import { IRepository } from './repository.interface';

export interface ICustomerRepository extends IRepository<Customer> { }
