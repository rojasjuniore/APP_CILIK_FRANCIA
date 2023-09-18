import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCategoryPassCardItemComponent } from './cart-category-pass-card-item.component';

describe('CartCategoryPassCardItemComponent', () => {
  let component: CartCategoryPassCardItemComponent;
  let fixture: ComponentFixture<CartCategoryPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCategoryPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCategoryPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
