import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public mostrar:any;

  public packageCompleto= {
    numero_personas:1,
    habitacion1:0,
    habitacion2:0,
    habitacion3:0,
    categoria:"",
    una_persona :{
      habitaciones:0,
      camas:[]
    },
    dos_personas:{
      habitaciones:0,
      camas:[]
    },
    tres_personas:{
      habitaciones:0,
      camas:[]
    },
    categoria_solista:0,
    categoria_parejas:0,
    categorias_grupos:0
  };

  constructor(public router: Router) { }

  ngOnInit(): void {
    if(this.router.url== '/pre-sale/home') {
      this.mostrar=false;
    } 
    localStorage.setItem('package', JSON.stringify(this.packageCompleto));
  }

}
