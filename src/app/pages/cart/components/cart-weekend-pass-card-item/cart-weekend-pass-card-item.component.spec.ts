import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartWeekendPassCardItemComponent } from './cart-weekend-pass-card-item.component';

describe('CartWeekendPassCardItemComponent', () => {
  let component: CartWeekendPassCardItemComponent;
  let fixture: ComponentFixture<CartWeekendPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartWeekendPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartWeekendPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
