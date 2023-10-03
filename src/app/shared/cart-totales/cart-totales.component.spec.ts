import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTotalesComponent } from './cart-totales.component';

describe('CartTotalesComponent', () => {
  let component: CartTotalesComponent;
  let fixture: ComponentFixture<CartTotalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartTotalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
