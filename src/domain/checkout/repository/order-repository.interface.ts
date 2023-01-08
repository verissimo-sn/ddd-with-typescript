import { IRepository } from "@domain/@shared/repository/repository.interface";

import { IOrder } from "../entity/order.interface";

export interface IOrderRepository extends IRepository<IOrder> { }
