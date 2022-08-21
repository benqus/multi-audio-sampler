import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

import './audio-recorder';
import './audio-multi-recorder';
import './audio-multi-record-control';

const styles = css`
  h2 {
    text-align: center;
  }

  .recorders {
    display: grid;
    grid-template-columns: repeat(4, min-content);
    grid-gap: 1em;
    justify-content: center;
  }

  section {
    padding: 1.5em;
    margin: .5em;
    border: 1px solid lightgray;
    border-radius: .25em;
  }
`;

@customElement('audio-sampler')
export class AudioSamplerElement extends LitElement {
  static styles = styles;

  render() {
    return html`
      <h2>Audio Sampler</h2>
      <section class="recorders">
        <audio-recorder></audio-recorder>
        <audio-recorder></audio-recorder>
        <audio-recorder></audio-recorder>
        <audio-recorder></audio-recorder>
        </section>
      <section class="recorders">
        <audio-multi-recorder></audio-multi-recorder>
        <audio-multi-recorder></audio-multi-recorder>
        <audio-multi-recorder></audio-multi-recorder>
        <audio-multi-recorder></audio-multi-recorder>
      </section>
      <section>
        <audio-multi-record-control></audio-multi-record-control>
      </section>
    `;
  }
}
