import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

import { pubsub } from '../pubsub';
import { MultiRecordEvent } from './types';

const styles = css`
  :host {
    display: block;
    text-align: center;
  }

  h4 {
    padding: 0;
    margin: 0;
  }

  header {
    padding-bottom: .5em;
  }

  button {
    padding: .25em 1em;
    vertical-align: middle;
    line-height: 1em;
    height: 2.5em;
    border: 1px solid gray;
    border-radius: 2px;
    cursor: pointer;
  }

  button.colored {
    background-color: lightsalmon;
    border: 1px solid gray;
  }
`;

@customElement('audio-multi-record-control')
export class AudioMultiRecordControlElement extends LitElement {
  static styles = styles;

  private _recording = false;

  public onClickStartMultiRecord = (e: MouseEvent): void => {
    this._recording = true;
    this.requestUpdate();

    pubsub.publisher(MultiRecordEvent.StartMultiRecord)
      .publish();
  }

  public onClickStopMultiRecord = (e: MouseEvent): void => {
    this._recording = false;
    this.requestUpdate();

    pubsub.publisher(MultiRecordEvent.StopMultiRecord)
      .publish();
  }

  public onClickResetMultiRecord = (e: MouseEvent): void => {
    this.requestUpdate();

    pubsub.publisher(MultiRecordEvent.ResetMultiRecord)
      .publish();
  }

  render() {
    const listener = this._recording ? this.onClickStopMultiRecord : this.onClickStartMultiRecord;
    return html`
      <header>
        <h4>Multi-Recording</h4>
      </header>
      <section>
        <button class="colored" @click=${listener}>${this._recording ? 'Stop' : 'Start'}</button>
        <button @click=${this.onClickResetMultiRecord} ?disabled=${this._recording}>Reset</button>
      </section>      
    `;
  }

}
