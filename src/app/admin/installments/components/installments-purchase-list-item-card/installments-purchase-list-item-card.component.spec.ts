import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsPurchaseListItemCardComponent } from './installments-purchase-list-item-card.component';

describe('InstallmentsPurchaseListItemCardComponent', () => {
  let component: InstallmentsPurchaseListItemCardComponent;
  let fixture: ComponentFixture<InstallmentsPurchaseListItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentsPurchaseListItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallmentsPurchaseListItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
