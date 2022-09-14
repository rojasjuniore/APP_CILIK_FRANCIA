import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleInstallmentsPayCoutaComponent } from './pre-sale-installments-pay-couta.component';

describe('PreSaleInstallmentsPayCoutaComponent', () => {
  let component: PreSaleInstallmentsPayCoutaComponent;
  let fixture: ComponentFixture<PreSaleInstallmentsPayCoutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleInstallmentsPayCoutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleInstallmentsPayCoutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
