import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBanktransferSelectOptionComponent } from './checkout-banktransfer-select-option.component';

describe('CheckoutBanktransferSelectOptionComponent', () => {
  let component: CheckoutBanktransferSelectOptionComponent;
  let fixture: ComponentFixture<CheckoutBanktransferSelectOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutBanktransferSelectOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutBanktransferSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
