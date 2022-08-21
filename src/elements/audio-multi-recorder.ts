import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import { createRef, ref } from 'lit/directives/ref';

import { AudioRecorderElement } from './audio-recorder';
import { ISubscription, pubsub } from '../pubsub';
import { MultiRecordEvent } from './types';

const styles = css`
  :host {
    display: block;
  }

  input[type="checkbox"] {
    accent-color: lightsalmon;
  }
`;

const StartSubscriber = pubsub.subscriber(MultiRecordEvent.StartMultiRecord);
const StopSubscriber = pubsub.subscriber(MultiRecordEvent.StopMultiRecord);
const ResetSubscriber = pubsub.subscriber(MultiRecordEvent.ResetMultiRecord);

@customElement('audio-multi-recorder')
export class AudioMultiRecorderElement extends LitElement {
  static styles = styles;

  private _$multiRecordRef = createRef<HTMLInputElement>();
  private _$audiRecorderRef = createRef<AudioRecorderElement>();

  private _startSubscription: ISubscription;
  private _stopSubscription: ISubscription;
  private _resetSubscription: ISubscription;

  connectedCallback(): void {
    super.connectedCallback();
    
    this._startSubscription = StartSubscriber.subscribe(this.onMultiRecordStart);
    this._stopSubscription = StopSubscriber.subscribe(this.onMultiRecordStop);
    this._resetSubscription = ResetSubscriber.subscribe(this.onMultiRecordReset);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this._startSubscription.unsubscribe();
    this._stopSubscription.unsubscribe();
    this._resetSubscription.unsubscribe();
  }

  onMultiRecordStart = (): void => {
    if (this._$multiRecordRef.value.checked) {
      this._$audiRecorderRef.value.startRecording();
    }
  }

  onMultiRecordStop = (): void => {
    if (this._$multiRecordRef.value.checked) {
      this._$audiRecorderRef.value.stopRecording();
    }
  }

  onMultiRecordReset = (): void => {
    if (this._$multiRecordRef.value.checked) {
      this._$audiRecorderRef.value.resetRecorder();
    }
  }

  render() {
    return html`
      <div>
        <label><span>Multi Record:</span>&nbsp;<input ${ref(this._$multiRecordRef)} type="checkbox"></label>
      </div>
      <audio-recorder ${ref(this._$audiRecorderRef)}></audio-recorder>
    `;
  }

}
