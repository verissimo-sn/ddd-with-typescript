import { Sequelize } from 'sequelize-typescript';

import { Order } from '@domain/checkout/entity/order';
import { OrderItem } from '@domain/checkout/entity/order-item';
import { Customer } from '@domain/customer/entity/customer';
import { Address } from '@domain/customer/values-object/address';
import { Product } from '@domain/product/entity/product';
import { CustomerModel } from '@infra/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository';
import { ProductModel } from '@infra/product/repository/sequelize/product.model';
import { ProductRepository } from '@infra/product/repository/sequelize/product.repositpry';

import { OrderItemModel } from './order-item.model';
import { OrderModel } from './order.model';
import { OrderRepository } from './order.repositpry';

describe('Integration: Order repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const address = new Address('street', 123, 123, 'city', 'country');
    const customer = new Customer('c1', 'Customer 1', address);
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('p1', 'product 1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      'oi1',
      product.name,
      product.id,
      product.price,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order('O1', customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: orderItem.productId,
        },
      ],
    });
  });
});
