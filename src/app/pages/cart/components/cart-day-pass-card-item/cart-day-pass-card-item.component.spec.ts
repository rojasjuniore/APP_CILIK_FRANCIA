import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDayPassCardItemComponent } from './cart-day-pass-card-item.component';

describe('CartDayPassCardItemComponent', () => {
  let component: CartDayPassCardItemComponent;
  let fixture: ComponentFixture<CartDayPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDayPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDayPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
