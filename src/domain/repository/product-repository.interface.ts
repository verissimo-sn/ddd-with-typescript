/* eslint-disable @typescript-eslint/no-empty-interface */
import { Product } from '@domain/entity/product';

import { IRepository } from './repository.interface';

export interface IProductRepository extends IRepository<Product> { }
