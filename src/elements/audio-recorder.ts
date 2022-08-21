import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { createRef, ref } from 'lit/directives/ref';

import { AudioController, AudioControllerState } from '../audio';

import { AudioInputSelectElement } from './audio-input-select';

const styles = css`
  :host {
    width: 10em;
  }

  .record-action {
    display: inline-block;
    width: 10em;
    height: 10em;
    border-radius: .5em;
    text-align: center;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: bold;
    color: white;
    cursor: pointer;
    border: 1px solid lightslategray;
    box-shadow: 0 0 .25em rgba(0, 0, 0, .5),
                inset 0 0 6.5em lightslategray;
  }

  .reset {
    margin-top: .5em;
    width: 100%;
  }
  
  .recorder:not(.empty) .record-action {
    border: 1px solid aqua;
    box-shadow: 0 0 .25em rgba(0, 0, 0, .5),
                inset 0 0 6.5em aqua;
  }
  
  .recorder.recording .record-action {
    border: 1px solid salmon;
    box-shadow: 0 0 .25em rgba(0, 0, 0, .5),
                inset 0 0 6.5em salmon;
  }

  input[type="checkbox"] {
    accent-color: lightblue;
  }
`;

@customElement('audio-recorder')
export class AudioRecorderElement extends LitElement {
  static styles = styles;

  private _$echoRef = createRef<HTMLInputElement>();
  private _$actionButtonRef = createRef<HTMLButtonElement>();
  private _$inputSelectRef = createRef<AudioInputSelectElement>();

  protected $recorder: AudioController = new AudioController();

  protected get $actionLabel(): string {
    switch (this.$recorder.state) {
      case AudioControllerState.Empty: return 'record';
      case AudioControllerState.Recording: return 'stop';
      case AudioControllerState.Ready: return 'play';
      case AudioControllerState.Playing: return 'pause';
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.$recorder.onstatechange = this.onRecorderStateChange;
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.$recorder.onstatechange = null;
  }

  public startRecording(): void {
    const { value: deviceId } = this._$inputSelectRef.value;
    const { checked: echoCancellation } = this._$echoRef.value;
    this.$recorder.startRecording(deviceId, echoCancellation);
  }

  public stopRecording(): void {
    this.$recorder.stopRecording();
  }

  public resetRecorder(): void {
    this.$recorder.reset();
  }

  public onRecorderStateChange = (): void => {
    this.requestUpdate();
  }

  public onClickAction(e: Event): void {
    switch(this.$recorder.state) {
      case AudioControllerState.Empty: this.startRecording(); break;
      case AudioControllerState.Recording: this.stopRecording(); break;
      case AudioControllerState.Ready: this.$recorder.startPlayback(); break;
      case AudioControllerState.Playing: this.$recorder.stopPlayback(); break;
    }
  }

  public onClickReset(e: Event): void {
    this.resetRecorder();
  }

  public onClickPlayPause = () => {
    this.$recorder.togglePlayback();
  }

  public render() {
    const classes = {
      empty: this.$recorder.state === AudioControllerState.Empty,
      recording: this.$recorder.state === AudioControllerState.Recording,
      ready: this.$recorder.state === AudioControllerState.Ready,
      playing: this.$recorder.state === AudioControllerState.Playing,
    };

    return html`
      <section>
        <audio-input-select ${ref(this._$inputSelectRef)}></audio-input-select>
        <label><span>Cancel echo:</span>&nbsp;<input ${ref(this._$echoRef)} type="checkbox" checked></label>
      </section>
      <section class="recorder ${classMap(classes)}">
        <button class="record-action" ${ref(this._$actionButtonRef)} @click=${this.onClickAction}>${this.$actionLabel}</button>
        <button class="reset" @click=${this.onClickReset} ?disabled=${this.$recorder.state < AudioControllerState.Ready}>reset</button>
      </section>
    `;
  }

}
