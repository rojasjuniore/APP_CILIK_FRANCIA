import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyEventPassCheckoutListComponent } from './pre-sale-only-event-pass-checkout-list.component';

describe('PreSaleOnlyEventPassCheckoutListComponent', () => {
  let component: PreSaleOnlyEventPassCheckoutListComponent;
  let fixture: ComponentFixture<PreSaleOnlyEventPassCheckoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyEventPassCheckoutListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyEventPassCheckoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
