import { ConfirmationOptions } from '../models/confirm-event.model';

type Handler = (e: ConfirmationOptions) => void;

type ConfirmEvent = 'open' | 'close';

function eventbus() {
  const allHandlers = new Map<string, Handler[]>();

  return {
    on(type: ConfirmEvent, handler: Handler) {
      let handlers = allHandlers.get(type);

      if (!handlers) handlers = [handler];
      else handlers.push(handler);

      allHandlers.set(type, handlers);
    },

    off(type: ConfirmEvent, handler: Handler) {
      const handlers = allHandlers.get(type);

      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },

    emit(type: ConfirmEvent, evt: ConfirmationOptions) {
      const handlers = allHandlers.get(type);

      if (handlers) {
        handlers.slice().map(handler => {
          handler(evt);
        });
      }
    },
  };
}

export const ConfirmEventBus = eventbus();
