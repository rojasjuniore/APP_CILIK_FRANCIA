import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyCategoriesSelectComponent } from './pre-sale-only-categories-select.component';

describe('PreSaleOnlyCategoriesSelectComponent', () => {
  let component: PreSaleOnlyCategoriesSelectComponent;
  let fixture: ComponentFixture<PreSaleOnlyCategoriesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyCategoriesSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyCategoriesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
