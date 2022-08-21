export type Args = Array<unknown>;
export type Listener = (...args: Args) => void;

export interface IMutable {
  muted: boolean;
  mute(): void;
  unmute(): void;
}

export interface ISubscription extends IMutable {
  readonly subscriber: ISubscriber;
  readonly listener: Listener;

  execute(...args: Args): void;
  unsubscribe(): void;
}

export interface IPubSuber {
  readonly pubsub: IPubSub;
  readonly topic: string;
}

export interface ISubscriber extends IPubSuber {
  publish(...args: Args): void;
  subscribe: (fn: Listener) => ISubscription;
  unsubscribe: (fn: Listener) => ISubscriber;
  remove: (subscription: ISubscription) => ISubscriber;
}

export interface IPublisher extends IPubSuber {
  publish(...args: Args): void;
}

export interface IPubSub {
  subscriber(topic: string): ISubscriber;
  publisher(topic: string): IPublisher;
}
