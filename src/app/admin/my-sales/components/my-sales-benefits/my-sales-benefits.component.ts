import { Component, Input, OnInit } from '@angular/core';
import { MySalesBenefitsService } from 'src/app/services/my-sales-benefits.service';

@Component({
  selector: 'app-my-sales-benefits',
  templateUrl: './my-sales-benefits.component.html',
  styleUrls: ['./my-sales-benefits.component.css']
})
export class MySalesBenefitsComponent implements OnInit {
  @Input() totalForItemList: any;
  @Input() couponsList: any;
  @Input() uid: any;
  public nivel: any;
  public ownerType = ""

  constructor(private mySalesBenefitsSrv: MySalesBenefitsService) { }

  ngOnInit(): void {
    if (!this.couponsList) return;
    this.ownerType = this.couponsList[0]['ownerType']
    if (this.ownerType == "ambassador") {
      this.nivel = this.mySalesBenefitsSrv.getNivelAmbassador(this.totalForItemList);
    } else if (this.ownerType == "academy") {
      this.nivel = this.mySalesBenefitsSrv.getNivelAcademy(this.totalForItemList);
    } else {
      console.log("No se encontro el tipo de owner");
    }

    console.log("nivel", this.nivel);
  }


  /**
  * 
  * @param $event 
  */
  onModalMySalesView($event) {
    console.log($event)
  }





}
