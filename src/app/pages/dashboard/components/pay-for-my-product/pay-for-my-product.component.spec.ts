import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayForMyProductComponent } from './pay-for-my-product.component';

describe('PayForMyProductComponent', () => {
  let component: PayForMyProductComponent;
  let fixture: ComponentFixture<PayForMyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayForMyProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayForMyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
