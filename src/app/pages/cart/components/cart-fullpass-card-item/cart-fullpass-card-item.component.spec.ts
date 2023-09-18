import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFullpassCardItemComponent } from './cart-fullpass-card-item.component';

describe('CartFullpassCardItemComponent', () => {
  let component: CartFullpassCardItemComponent;
  let fixture: ComponentFixture<CartFullpassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartFullpassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartFullpassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
