import { getMediaStreamConstraints } from './utils';

export class AudioRecorder {
  private _recordedChunks: Array<Blob> = [];
  private _recordedMedia: Blob = null;
  private _recordedMediaURL: string = null;
  private _recording: boolean = false;

  public mediaRecorder: MediaRecorder = null;

  public get recording(): boolean { return this._recording; }
  public get mediaURL(): string { return this._recordedMediaURL; }

  private _onRecorderDataAvailable = (event: BlobEvent): void => {
    if (event.data.size > 0) {
      this._recordedChunks.push(event.data);
    }
  }

  private _onRecorderStart = (): void => {
    this._recording = true;
  }

  private _onRecorderStop = (): void => {
    const type = 'audio/mpeg';
    this._recording = false;
    this._recordedMedia = new Blob(this._recordedChunks, { type });
    this._recordedMediaURL = URL.createObjectURL(this._recordedMedia);
  }

  public async start(deviceId: string, echoCancellation: boolean): Promise<void> {
    if (this._recording) return;

    const constraints = getMediaStreamConstraints(deviceId, echoCancellation);
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = this._onRecorderDataAvailable;
    this.mediaRecorder.onstart = this._onRecorderStart;
    this.mediaRecorder.onstop = this._onRecorderStop;
    this.mediaRecorder.start();
  }

  public stop(): void {
    if (this._recording) {
      this.mediaRecorder.stop();
    }
  }

  public reset(): void {
    if (this.mediaRecorder?.state !== 'inactive') this.stop();

    if (this._recordedMediaURL) URL.revokeObjectURL(this._recordedMediaURL);

    this.mediaRecorder = null;
    this._recordedMedia = null;
    this._recordedMediaURL = null;
    this._recordedChunks = [];
    this._recording = false;
  }

}
