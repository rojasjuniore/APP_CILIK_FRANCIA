import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFullpassCardItemComponent } from './purchase-fullpass-card-item.component';

describe('PurchaseFullpassCardItemComponent', () => {
  let component: PurchaseFullpassCardItemComponent;
  let fixture: ComponentFixture<PurchaseFullpassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseFullpassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseFullpassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
