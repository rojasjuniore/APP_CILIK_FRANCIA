import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-another-option',
  templateUrl: './another-option.component.html',
  styleUrls: ['./another-option.component.css']
})
export class AnotherOptionComponent implements OnInit {

  listOption = [
    {
      imagenUrl: "/assets/img/fiestas.jpg",
      title: "Registro de escuela",
      description: "Bienvenidos al proceso de pre registro del World Latin Dance Cup. ¡Tu escuela ha sido pre-registrada!",
      router: "/school/registerSchool"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
