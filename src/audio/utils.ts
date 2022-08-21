export function getMediaStreamConstraints(deviceId: string, echoCancellation: boolean = true): MediaStreamConstraints {
  const video = false;
  const audio = { deviceId, echoCancellation };
  return { audio, video };
}
