import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCategoryPassCardItemComponent } from './purchase-category-pass-card-item.component';

describe('PurchaseCategoryPassCardItemComponent', () => {
  let component: PurchaseCategoryPassCardItemComponent;
  let fixture: ComponentFixture<PurchaseCategoryPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseCategoryPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCategoryPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
