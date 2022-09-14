import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  spinnerConecction = false
  constructor(public contractService: ContractService) {
    this.contractService.spinnerConecction$.subscribe(value => {
      this.spinnerConecction = value
    })
  }

  ngOnInit(): void {
  }

}
