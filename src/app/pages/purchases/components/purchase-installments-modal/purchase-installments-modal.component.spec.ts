import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInstallmentsModalComponent } from './purchase-installments-modal.component';

describe('PurchaseInstallmentsModalComponent', () => {
  let component: PurchaseInstallmentsModalComponent;
  let fixture: ComponentFixture<PurchaseInstallmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInstallmentsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInstallmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
