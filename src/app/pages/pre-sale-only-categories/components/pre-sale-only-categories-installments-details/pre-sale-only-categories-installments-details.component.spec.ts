import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyCategoriesInstallmentsDetailsComponent } from './pre-sale-only-categories-installments-details.component';

describe('PreSaleOnlyCategoriesInstallmentsDetailsComponent', () => {
  let component: PreSaleOnlyCategoriesInstallmentsDetailsComponent;
  let fixture: ComponentFixture<PreSaleOnlyCategoriesInstallmentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyCategoriesInstallmentsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyCategoriesInstallmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
