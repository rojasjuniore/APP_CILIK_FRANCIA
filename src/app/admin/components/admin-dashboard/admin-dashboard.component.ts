import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public adminOptions = [
    {
      label: 'Manager Transfer Payments',
      icon: 'fa fa-money',
      description: 'Manager Transfer Payments',
      type: 'navigation',
      url: '/admin/payments',
      available: true
    }
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { }

  launch(item: any){
    switch (item.type) {
      case 'navigation':
        this.router.navigate([item.url]);
        break;
    
      default:
        console.log('default', item);
        break;
    }
  }

}
