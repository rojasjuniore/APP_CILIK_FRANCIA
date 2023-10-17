import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBankTransferInfoCardItemComponent } from './purchase-bank-transfer-info-card-item.component';

describe('PurchaseBankTransferInfoCardItemComponent', () => {
  let component: PurchaseBankTransferInfoCardItemComponent;
  let fixture: ComponentFixture<PurchaseBankTransferInfoCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseBankTransferInfoCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseBankTransferInfoCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
