import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleModalOnlyCategoriesTermsComponent } from './pre-sale-modal-only-categories-terms.component';

describe('PreSaleModalOnlyCategoriesTermsComponent', () => {
  let component: PreSaleModalOnlyCategoriesTermsComponent;
  let fixture: ComponentFixture<PreSaleModalOnlyCategoriesTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleModalOnlyCategoriesTermsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleModalOnlyCategoriesTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
