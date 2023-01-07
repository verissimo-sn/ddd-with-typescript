export type InputFindCustomer = {
  id: string;
};

export type OutputFindCustomer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zipCode: number;
    country: string;
  };
};
