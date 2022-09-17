import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyCategoriesComponent } from './pre-sale-only-categories.component';

describe('PreSaleOnlyCategoriesComponent', () => {
  let component: PreSaleOnlyCategoriesComponent;
  let fixture: ComponentFixture<PreSaleOnlyCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
