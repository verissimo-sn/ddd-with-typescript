import { IValidator } from "@domain/@shared/validator/validator.interface";
import { ICustomer } from "../entity/customer.interface";
import * as yup from 'yup';

export class YupCustomerValidator implements IValidator<ICustomer> {

  validate(entity: ICustomer): void {
    yup
      .object()
      .shape({
        id: yup.string().required('Id is required'),
        name: yup.string().required('Name is required'),
      })
      .validateSync({
        id: entity.id,
        name: entity.name
      }, {
        abortEarly: false,
      })
  }
}