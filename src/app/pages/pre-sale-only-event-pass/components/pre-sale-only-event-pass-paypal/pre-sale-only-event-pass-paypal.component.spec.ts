import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyEventPassPaypalComponent } from './pre-sale-only-event-pass-paypal.component';

describe('PreSaleOnlyEventPassPaypalComponent', () => {
  let component: PreSaleOnlyEventPassPaypalComponent;
  let fixture: ComponentFixture<PreSaleOnlyEventPassPaypalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyEventPassPaypalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyEventPassPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
