import { Request, Response } from 'express';

import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository';
import { FindCustomerUseCase } from '@useCase/customer/find/find-customer.usecase';

const repository = new CustomerRepository();

export const findById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const useCase = new FindCustomerUseCase(repository);
    const response = await useCase.execute({ id });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error });
  }
}