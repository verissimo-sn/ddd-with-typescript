import { IEvent } from '../@shared/event.interface';

export class ProductCreatedEvent implements IEvent {
  dataTimeOcurred: Date;
  eventData;

  constructor(eventData: any) {
    this.eventData = eventData;
    this.dataTimeOcurred = new Date();
  }
}
