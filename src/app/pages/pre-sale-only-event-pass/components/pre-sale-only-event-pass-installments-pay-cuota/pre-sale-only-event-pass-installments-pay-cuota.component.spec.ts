import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyEventPassInstallmentsPayCuotaComponent } from './pre-sale-only-event-pass-installments-pay-cuota.component';

describe('PreSaleOnlyEventPassInstallmentsPayCuotaComponent', () => {
  let component: PreSaleOnlyEventPassInstallmentsPayCuotaComponent;
  let fixture: ComponentFixture<PreSaleOnlyEventPassInstallmentsPayCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyEventPassInstallmentsPayCuotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyEventPassInstallmentsPayCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
