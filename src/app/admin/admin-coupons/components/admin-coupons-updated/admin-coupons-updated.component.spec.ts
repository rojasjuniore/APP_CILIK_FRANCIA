import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCouponsUpdatedComponent } from './admin-coupons-updated.component';

describe('AdminCouponsUpdatedComponent', () => {
  let component: AdminCouponsUpdatedComponent;
  let fixture: ComponentFixture<AdminCouponsUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCouponsUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCouponsUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
