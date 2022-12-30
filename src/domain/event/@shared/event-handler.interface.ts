import { IEvent } from './event.interface';

export interface IEventHandler<T extends IEvent = IEvent> {
  handleEvent(event: T): void;
}
