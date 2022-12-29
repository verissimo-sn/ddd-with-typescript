/* eslint-disable @typescript-eslint/no-empty-interface */

import { Order } from '@domain/entity/order';

import { IRepository } from './repository.interface';

export interface IOrderRepository extends IRepository<Order> { }
