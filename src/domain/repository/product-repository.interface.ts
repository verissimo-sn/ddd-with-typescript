/* eslint-disable @typescript-eslint/no-empty-interface */
import { Product } from '@domain/entity/product';

import { IRepositoryInterface } from './repository.interface';

export interface IProductRepository extends IRepositoryInterface<Product> { }
