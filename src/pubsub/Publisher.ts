import { Args, IPublisher, IPubSub } from './types';

export class Publisher implements IPublisher {
  constructor(
    public readonly pubsub: IPubSub,
    public readonly topic: string,
  ) {}

  public publish(...args: Args): void {
    const subscriber = this.pubsub.subscriber(this.topic);
    subscriber?.publish(...args);
  }
}
