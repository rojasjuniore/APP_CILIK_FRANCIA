import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantModalEditAmountComponent } from './merchant-modal-edit-amount.component';

describe('MerchantModalEditAmountComponent', () => {
  let component: MerchantModalEditAmountComponent;
  let fixture: ComponentFixture<MerchantModalEditAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantModalEditAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantModalEditAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
