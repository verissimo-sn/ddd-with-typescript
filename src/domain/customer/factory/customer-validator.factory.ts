import { IValidator } from "@domain/@shared/validator/validator.interface";
import { ICustomer } from "../entity/customer.interface";
import { YupCustomerValidator } from "../validator/yup-customer.validator";

export class CustomerValidatorFactory {
  static create(): IValidator<ICustomer> {
    return new YupCustomerValidator();
  }
}