import { IEventHandler } from '@domain/@shared/event/event-handler.interface';

import { ProductCreatedEvent } from '../product-created.event';

export class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log('Sending email');
  }
}
