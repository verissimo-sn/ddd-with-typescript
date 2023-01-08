export type InputCreateCustomer = {
  name: string,
  address: {
    street: string,
    number: number
    zipCode: number,
    city: string,
    country: string
  }
}

export type OutputCreateCustomer = {
  id: string,
}
