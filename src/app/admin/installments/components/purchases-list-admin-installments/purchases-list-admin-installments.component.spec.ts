import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesListAdminInstallmentsComponent } from './purchases-list-admin-installments.component';

describe('PurchasesListAdminInstallmentsComponent', () => {
  let component: PurchasesListAdminInstallmentsComponent;
  let fixture: ComponentFixture<PurchasesListAdminInstallmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesListAdminInstallmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesListAdminInstallmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
