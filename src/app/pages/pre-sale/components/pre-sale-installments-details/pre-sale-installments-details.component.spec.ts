import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleInstallmentsDetailsComponent } from './pre-sale-installments-details.component';

describe('PreSaleInstallmentsDetailsComponent', () => {
  let component: PreSaleInstallmentsDetailsComponent;
  let fixture: ComponentFixture<PreSaleInstallmentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleInstallmentsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleInstallmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
