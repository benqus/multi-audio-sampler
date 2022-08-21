import { Listener, ISubscription, ISubscriber, Args } from './types';

export class Subscription implements ISubscription {
  private _muted: boolean = false;

  constructor(
    public readonly subscriber: ISubscriber,
    public readonly listener: Listener,
  ) {}

  public get muted(): boolean {
    return this._muted;
  }

  public execute(...args: Args): void {
    if (this._muted) return;
    this.listener(this.subscriber.topic, ...args);
  }

  public mute(): void {
    this._muted = true;
  }

  public unmute(): void {
    this._muted = true;
  }

  public unsubscribe(): void {
    this.subscriber.remove(this);
  }
}
