import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyEventPassInstallmentsDetailsComponent } from './pre-sale-only-event-pass-installments-details.component';

describe('PreSaleOnlyEventPassInstallmentsDetailsComponent', () => {
  let component: PreSaleOnlyEventPassInstallmentsDetailsComponent;
  let fixture: ComponentFixture<PreSaleOnlyEventPassInstallmentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyEventPassInstallmentsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyEventPassInstallmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
