import { Request, Response } from 'express';

import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository';
import { FindCustomerUseCase } from '@useCase/customer/find/find-customer.usecase';
import { CustomerPresenter } from '@infra/api/presenters/customer.presenter';

const repository = new CustomerRepository();

export const findById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const useCase = new FindCustomerUseCase(repository);
    const output = await useCase.execute({ id });

    return res.format({
      json() { res.send(output) },
      xml: () => res.send(CustomerPresenter.customerToXml(output))
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}