import { Order } from '@domain/checkout/entity/order';
import { IOrderRepository } from '@domain/checkout/repository/order-repository.interface';

import { OrderItemModel } from './order-item.model';
import { OrderModel } from './order.model';

export class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    throw new Error('Method not implemented');
  }

  async find(id: string): Promise<Order | null> {
    throw new Error('Method not implemented');
  }

  async findAll(): Promise<Order[]> {
    throw new Error('Method not implemented');
  }
}
