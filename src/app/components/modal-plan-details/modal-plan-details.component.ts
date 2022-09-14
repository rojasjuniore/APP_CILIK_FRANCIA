import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-plan-details',
  templateUrl: './modal-plan-details.component.html',
  styleUrls: ['./modal-plan-details.component.css']
})
export class ModalPlanDetailsComponent implements OnInit {

  public detailsList = [
    'Hospedaje Hotel Las Americas',
    'Desayuno Americano o buffet',
    'Full Pass',
    'Una Categoria por Persona',
    'Conciertos',
    'Fiestas',
    'Talleres',
    'Poolparties'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
