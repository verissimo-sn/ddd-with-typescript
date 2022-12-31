import { IEvent } from '@domain/@shared/event/event.interface';

export class ProductCreatedEvent implements IEvent {
  dataTimeOcurred: Date;
  eventData;

  constructor(eventData: any) {
    this.eventData = eventData;
    this.dataTimeOcurred = new Date();
  }
}
