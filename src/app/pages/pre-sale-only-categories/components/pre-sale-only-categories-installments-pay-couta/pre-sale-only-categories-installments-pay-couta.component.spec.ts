import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyCategoriesInstallmentsPayCoutaComponent } from './pre-sale-only-categories-installments-pay-couta.component';

describe('PreSaleOnlyCategoriesInstallmentsPayCoutaComponent', () => {
  let component: PreSaleOnlyCategoriesInstallmentsPayCoutaComponent;
  let fixture: ComponentFixture<PreSaleOnlyCategoriesInstallmentsPayCoutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyCategoriesInstallmentsPayCoutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyCategoriesInstallmentsPayCoutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
