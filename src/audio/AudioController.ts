import { AudioPlayer } from './AudioPlayer';
import { AudioRecorder } from './AudioRecorder';
import { AudioControllerState } from './types';

export class AudioController {
  private _state: AudioControllerState = AudioControllerState.Empty;

  public readonly recorder = new AudioRecorder();
  public readonly player = new AudioPlayer();

  public onstatechange: () => void | null = null;

  public get state(): AudioControllerState { return this._state; }

  constructor() {
    this.player.onended = () => this._setState(AudioControllerState.Ready);
  }

  private _setState(state: AudioControllerState): void {
    this._state = state;
    this.onstatechange?.();
  }

  public async startRecording(deviceId: string, echoCancellation: boolean): Promise<void> {
    this.player.stop();
    this.recorder.reset();
    this.recorder.start(deviceId, echoCancellation);
    this._setState(AudioControllerState.Recording);
  }

  public stopRecording(): void {
    this.recorder.stop();
    this._setState(AudioControllerState.Ready);
  }

  public startPlayback(): void {
    this.player.start(this.recorder.mediaURL);
    this._setState(AudioControllerState.Playing);
  }

  public togglePlayback(): void {
    this.player.paused ? this.startPlayback() : this.pausePlayback();
  }

  public pausePlayback(): void {
    this.player.pause();
    this._setState(AudioControllerState.Ready);
  }

  public stopPlayback(): void {
    this.player.stop();
    this._setState(AudioControllerState.Ready);
  }

  public reset(): void {
    this.player.stop();
    this.recorder.reset();
    this._setState(AudioControllerState.Empty);
  }

}
