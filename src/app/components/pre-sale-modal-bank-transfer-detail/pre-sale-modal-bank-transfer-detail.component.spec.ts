import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleModalBankTransferDetailComponent } from './pre-sale-modal-bank-transfer-detail.component';

describe('PreSaleModalBankTransferDetailComponent', () => {
  let component: PreSaleModalBankTransferDetailComponent;
  let fixture: ComponentFixture<PreSaleModalBankTransferDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleModalBankTransferDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleModalBankTransferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
