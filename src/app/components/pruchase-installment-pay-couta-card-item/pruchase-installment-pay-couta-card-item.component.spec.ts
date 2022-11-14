import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruchaseInstallmentPayCoutaCardItemComponent } from './pruchase-installment-pay-couta-card-item.component';

describe('PruchaseInstallmentPayCoutaCardItemComponent', () => {
  let component: PruchaseInstallmentPayCoutaCardItemComponent;
  let fixture: ComponentFixture<PruchaseInstallmentPayCoutaCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruchaseInstallmentPayCoutaCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruchaseInstallmentPayCoutaCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
