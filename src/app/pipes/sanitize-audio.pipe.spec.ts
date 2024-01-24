import { SanitizeAudioPipe } from './sanitize-audio.pipe';

describe('SanitizeAudioPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeAudioPipe();
    expect(pipe).toBeTruthy();
  });
});
