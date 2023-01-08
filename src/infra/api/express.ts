import { CustomerModel } from '@infra/customer/repository/sequelize/customer.model';
import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';

export const app: Express = express();
app.use(express.json());

export let sequelize: Sequelize;

(async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  });

  sequelize.addModels([CustomerModel]);
  await sequelize.sync();
})()
