import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent implements OnChanges {
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
  @Input() audio: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { audio } = changes;
    if (audio && audio.currentValue) {
      this.audio = audio.currentValue;
      this.onFileSelected(this.audio);
    }
  }

  ngOnInit(): void {}

  onFileSelected(files): void {
    console.log('files', files);
    const file: File = files;
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        this.audioPlayer.nativeElement.src = e.target.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
}
