import { Request, Response } from 'express';

import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository';
import { CreateCustomerUseCase } from '@useCase/customer/create/create-customer.usecase';

const repository = new CustomerRepository();

export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, address } = req.body;
    const useCase = new CreateCustomerUseCase(repository);
    const response = await useCase.execute({ name, address });

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
}