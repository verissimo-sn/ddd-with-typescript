import { OutputFindCustomer } from "@useCase/customer/find/find-customer.dto";
import { toXML, XmlOptions } from "jstoxml";

const xmlOptions: XmlOptions = {
  header: true,
  indent: " ",
}

export class CustomerPresenter {
  static customerToXml(data: OutputFindCustomer): string {
    return toXML({
      customer: {
        ...data
      }
    }, xmlOptions)
  }
}