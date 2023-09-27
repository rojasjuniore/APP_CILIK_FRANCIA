import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { formatBytes } from 'src/app/helpers/formatBytes.helper';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-custom-input-file',
  templateUrl: './custom-input-file.component.html',
  styleUrls: ['./custom-input-file.component.css']
})
export class CustomInputFileComponent implements OnInit {

  @ViewChild('inputFileRef') inputFileRef!: ElementRef<HTMLInputElement>;

  @Input() label: string = "Select a file";

  /** Accept only PDF */
  // @Input() accept: string = "application/pdf";
  @Input() accept: string = ".pdf";

  @Input() multiple: boolean = false;

  @Input() uploadBtnText: string = "Select file";

  @Input() submitBtnText: string = "Submit";

  @Input() confirmBtnText: string = "Confirm";

  @Input() cancelBtnText: string = "Cancel";

  @Input() clearBtnText: string = "Clear";

  @Input() noSelectFileText: string = "No file selected";

  @Output() onSelectFile = new Subject<File | null>();

  public fileLoaded: boolean = false;
  public formFile!: File | null;

  constructor(
    private sweetAlert2Srv: Sweetalert2Service,
  ) { }

  ngOnInit(): void {
  }

  get fileName(): string | null {
    return this.formFile ? this.formFile.name : null;
  }

  get sizeParsed(): string | null {
    return this.formFile ? formatBytes(this.formFile.size) : null;
  }

  openFileSelection(){ this.inputFileRef.nativeElement.click(); }

  clearFile(){
    this.fileLoaded = false;
    this.formFile = null;
    // this.onSelectFile.next(null);
    this.inputFileRef.nativeElement.value = "";
  }

  onFileSelected(){
    console.log('onFileSelected');
    this.fileLoaded = true;
    const files = this.inputFileRef.nativeElement.files;

    if (!files || files.length == 0) {
      return;
    }

    /**
     * TODO: habilitar validaciones para cuando sean multiples archivos
     */

    const fileLength = files.length;
    const fileValidation = files[0].type;

    if (fileValidation !== "application/pdf") {
      this.sweetAlert2Srv.showError(" solo se admiten archivos pdf");
      this.clearFile();
      return;
    }

    this.formFile = files[0];
    console.log(this.formFile);
    // this.onSelectFile.next(this.formFile);
    
    // clear input file
    this.inputFileRef.nativeElement.value = "";
  }

  onConfirm(){
    this.onSelectFile.next(this.formFile);
  }

}
