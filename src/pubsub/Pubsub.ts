import { Publisher } from './Publisher';
import { Subscriber } from './Subscriber';
import { IPubSub, ISubscriber, IPublisher } from './types';

export class PubSub implements IPubSub {
  protected readonly $subscribers: Map<string, ISubscriber> = new Map();
  protected readonly $publishers: Map<string, IPublisher> = new Map();

  private _createSubscriberAndPublisher(topic: string): void {
    if (this.$subscribers.has(topic)) return;
    const sub = new Subscriber(this, topic);
    const pub = new Publisher(this, topic);

    this.$subscribers.set(topic, sub);
    this.$publishers.set(topic, pub);
  }

  public subscriber(topic: string): ISubscriber {
    this._createSubscriberAndPublisher(topic);
  
    return this.$subscribers.get(topic);
  }

  public publisher(topic: string): IPublisher {
    this._createSubscriberAndPublisher(topic);
  
    return this.$publishers.get(topic);
  }
}
