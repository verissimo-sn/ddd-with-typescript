import { IRepository } from "@domain/@shared/repository/repository.interface";
import { Order } from "../entity/order";


export interface IOrderRepository extends IRepository<Order> { }
