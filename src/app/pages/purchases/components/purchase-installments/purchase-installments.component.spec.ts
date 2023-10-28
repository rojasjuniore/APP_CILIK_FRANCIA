import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInstallmentsComponent } from './purchase-installments.component';

describe('PurchaseInstallmentsComponent', () => {
  let component: PurchaseInstallmentsComponent;
  let fixture: ComponentFixture<PurchaseInstallmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInstallmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInstallmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
