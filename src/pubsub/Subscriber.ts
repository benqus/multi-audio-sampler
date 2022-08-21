import { Subscription } from './Subscription';
import { Listener, IPubSub, ISubscription, ISubscriber, Args } from './types';

export class Subscriber implements ISubscriber {
  protected readonly $subscriptions: Set<ISubscription> = new Set();

  constructor(
    public readonly pubsub: IPubSub,
    public readonly topic: string,
  ) {}

  public publish(...args: Args): void {
    this.$subscriptions.forEach(s => s.execute(...args));
  }

  public subscribe(listener: Listener): ISubscription {
    const subscription = new Subscription(this, listener);
    this.$subscriptions.add(subscription);
    return subscription;
  }

  public unsubscribe(listener: Listener): ISubscriber {
    const subscription = [...this.$subscriptions.values()].find(s => s.listener === listener);
    this.$subscriptions.delete(subscription);
    return this;
  }

  public remove(subscription: ISubscription): ISubscriber {
    this.$subscriptions.delete(subscription);
    return this;
  }
}
