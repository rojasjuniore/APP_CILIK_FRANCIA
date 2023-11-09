import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailsAdminComponent } from './purchase-details-admin.component';

describe('PurchaseDetailsAdminComponent', () => {
  let component: PurchaseDetailsAdminComponent;
  let fixture: ComponentFixture<PurchaseDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
