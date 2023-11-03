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
      description: "Inicio  del Pre-registro para Escuelas - World Latin Dance Cup",
      router: "/school/registerSchool"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
