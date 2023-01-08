import { CustomerModel } from '@infra/customer/repository/sequelize/customer.model';
import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { customerRouter } from './routes/customer/customer.router';

export const app: Express = express();
app.use(express.json());

app.use('/customers', customerRouter);

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
