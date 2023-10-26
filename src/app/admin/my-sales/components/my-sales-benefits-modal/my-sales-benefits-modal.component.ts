import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { Subject, Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { MySalesBenefitsService } from 'src/app/services/my-sales-benefits.service';

@Component({
  selector: 'app-my-sales-benefits-modal',
  templateUrl: './my-sales-benefits-modal.component.html',
  styleUrls: ['./my-sales-benefits-modal.component.css']
})
export class MySalesBenefitsModalComponent implements OnInit {

  benefits: any
  constructor(
    private route: ActivatedRoute,
    private mySalesBenefitsSrv: MySalesBenefitsService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const ownerType = this.route.snapshot.paramMap.get('ownerType');

    this.benefits = this.mySalesBenefitsSrv.getBenefits(id, ownerType)
    console.log("benefits", this.benefits);
  }

}
