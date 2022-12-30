import { IEventDispatcher } from './event-dispatcher.interface';
import { IEventHandler } from './event-handler.interface';
import { IEvent } from './event.interface';

type EventHandlers = {
  [eventName: string]: IEventHandler[];
};

export class EventDispatcher implements IEventDispatcher {
  private eventHandlers: EventHandlers = {};

  get getEventHandlers(): EventHandlers {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    throw new Error('Method not implemented.');
  }

  register(eventName: string, eventHandler: IEventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: IEventHandler): void {
    if (!this.eventHandlers[eventName]) {
      throw new Error(`Event not registered: ${eventName}`);
    }

    const eventHandlerIndex =
      this.eventHandlers[eventName].indexOf(eventHandler);

    if (eventHandlerIndex) {
      throw new Error('EventHandler not registered');
    }

    this.eventHandlers[eventName].splice(eventHandlerIndex, 1);
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
