import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePayCuotaComponent } from './purchase-pay-cuota.component';

describe('PurchasePayCuotaComponent', () => {
  let component: PurchasePayCuotaComponent;
  let fixture: ComponentFixture<PurchasePayCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasePayCuotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasePayCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
