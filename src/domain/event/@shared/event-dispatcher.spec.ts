import { SendEmailWhenProductIsCreatedHandler } from '../product/handler/send-email-when-product-is-created.handler';
import { ProductCreatedEvent } from '../product/product-created.event';
import { EventDispatcher } from './event-dispatcher';

describe('Unit: Event', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventName = 'ProductCreatedEvent';

    eventDispatcher.register(eventName, eventHandler);

    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
    expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(
      eventHandler
    );
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventName = 'ProductCreatedEvent';

    eventDispatcher.register(eventName, eventHandler);

    expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(
      eventHandler
    );

    eventDispatcher.unregister(eventName, eventHandler);

    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendEmailWhenProductIsCreatedHandler();
    const eventHandler2 = new SendEmailWhenProductIsCreatedHandler();
    const eventName = 'ProductCreatedEvent';

    eventDispatcher.register(eventName, eventHandler1);
    eventDispatcher.register(eventName, eventHandler2);

    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(2);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers).toStrictEqual({});
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'product description',
      price: 'price',
    });

    const eventName = productCreatedEvent.constructor.name;

    eventDispatcher.register(eventName, eventHandler);

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toBeCalled();
  });
});
