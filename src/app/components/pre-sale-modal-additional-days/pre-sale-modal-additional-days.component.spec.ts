import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleModalAdditionalDaysComponent } from './pre-sale-modal-additional-days.component';

describe('PreSaleModalAdditionalDaysComponent', () => {
  let component: PreSaleModalAdditionalDaysComponent;
  let fixture: ComponentFixture<PreSaleModalAdditionalDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleModalAdditionalDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleModalAdditionalDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
