import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  public coupons$!: Observable<any[]>;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async launchAddCouponForm() {
    console.log('launchAddCouponForm');
    this.router.navigate(['/admin/coupons/store']);
  }

}
