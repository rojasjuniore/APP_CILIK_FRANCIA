import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleInstallmentCoutaCardItemComponent } from './pre-sale-installment-couta-card-item.component';

describe('PreSaleInstallmentCoutaCardItemComponent', () => {
  let component: PreSaleInstallmentCoutaCardItemComponent;
  let fixture: ComponentFixture<PreSaleInstallmentCoutaCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleInstallmentCoutaCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleInstallmentCoutaCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
