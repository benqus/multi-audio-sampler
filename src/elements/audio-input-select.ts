import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import { createRef, ref } from 'lit/directives/ref';
import { repeat } from 'lit/directives/repeat';

const styles = css`
  select {
    width: 100%;
  }
`;

@customElement('audio-input-select')
export class AudioInputSelectElement extends LitElement {
  static styles = styles;

  private _$selectRef = createRef<HTMLSelectElement>();
  private _devices: Array<MediaDeviceInfo> = [];  

  public get value(): string | null {
    return this._$selectRef.value.value;
  }

  async connectedCallback() {
    super.connectedCallback();

    const devices = await navigator.mediaDevices.enumerateDevices();
    this._devices = devices.filter(({ kind }) => kind === 'audioinput');

    this.requestUpdate();
  }

  render() {
    return html`
      <select ${ref(this._$selectRef)}>
        ${repeat(this._devices, ({ deviceId, label }) => html`<option value=${deviceId}>${label}</option>`)}
      </select>
    `;
  }
}

