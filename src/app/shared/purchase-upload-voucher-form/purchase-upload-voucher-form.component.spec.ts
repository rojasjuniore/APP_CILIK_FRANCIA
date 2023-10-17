import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseUploadVoucherFormComponent } from './purchase-upload-voucher-form.component';

describe('PurchaseUploadVoucherFormComponent', () => {
  let component: PurchaseUploadVoucherFormComponent;
  let fixture: ComponentFixture<PurchaseUploadVoucherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseUploadVoucherFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseUploadVoucherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
