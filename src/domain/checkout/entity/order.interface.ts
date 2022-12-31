import { OrderItem } from './order-item';

export interface IOrder {
  get id(): string;
  get customerId(): string;
  get items(): OrderItem[];
  total(): number;
}
