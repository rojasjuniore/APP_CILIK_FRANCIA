import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeAudio'
})
export class SanitizeAudioPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(audioUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(audioUrl);
  }

}
