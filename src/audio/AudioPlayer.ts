export class AudioPlayer {
  private _audio: HTMLAudioElement | null = null;
  private _mediaURL: string = '';

  public onended = () => {};

  public get mediaURL(): string { return this._mediaURL; }
  public get paused(): boolean { return this._audio?.paused ?? true; }

  public start(mediaURL: string = this.mediaURL): void {
    this._mediaURL = mediaURL;
    this._audio = new Audio(mediaURL);
    this._audio.onended = () => this.onended();
    this._audio.play();
  }

  public pause(): void {
    this._audio?.pause();
  }

  public stop(): void {
    if (this._audio) {
      this.pause();
      this._audio.currentTime = 0;
    }
  }

}
