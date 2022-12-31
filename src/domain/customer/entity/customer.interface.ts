import { Address } from '../values-object/address';

export interface ICustomer {
  get status(): boolean;
  get id(): string;
  get name(): string;
  changeName(name: string): void;
  get rewardPoints(): number;
  addRewardPoints(points: number): void;
  get address(): Address;
  changeAddress(address: Address): void;
  activate(): void;
  deactivate(): void;
}
