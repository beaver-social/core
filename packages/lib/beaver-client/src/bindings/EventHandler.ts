import { UserInfo } from "../types/api";
import { Connection } from "../types/wallet";

export default class EventNotifier {
  listeners: Partial<{
    [K in EventKey]: EventHandler<K>[];
  }> = {};

  emit<T extends EventKey>(eventKey: T, data: EventEmissions[T]) {
    const listeners = this.listeners[eventKey] ?? [];

    for (const listener of listeners) {
      try {
        const result = listener(data);
        if (result instanceof Promise) {
          result.catch((error) => {
            console.error(`Error in event handler for ${eventKey}:`, error);
          });
        }
      } catch (error) {
        console.error(`Error in event handler for ${eventKey}:`, error);
      }
    }
  }

  on<T extends EventKey>(event: T, handler: EventHandler<T>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);
  }

  clearEventListeners(): void;
  clearEventListeners(event: EventKey): void;

  clearEventListeners(event?: EventKey): void {
    if (!event) {
      this.listeners = {};
    }
    if (event && this.listeners[event]) {
      this.listeners[event] = [];
    }
  }
}

type EventHandler<T extends EventKey> = (
  data: EventEmissions[T]
) => void | Promise<void>;

type EventKey = keyof EventEmissions;

type EventEmissions = {
  "connection:change": {
    connection: Connection;
    hasIdentity: boolean;
  };

  "user:login": {
    user: UserInfo;
  };

  "user:logout": {};

  "user:update": {
    user: UserInfo | null;
  };

  "beaver:ready": {};

  "connection:disconnect": {};

  "social:follow": {
    followingId: number;
    userId: number;
  };

  "social:unfollow": {
    followingId: number;
    userId: number;
  };
};
