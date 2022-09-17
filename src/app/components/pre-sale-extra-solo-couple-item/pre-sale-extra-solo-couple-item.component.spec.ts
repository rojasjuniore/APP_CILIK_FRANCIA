import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleExtraSoloCoupleItemComponent } from './pre-sale-extra-solo-couple-item.component';

describe('PreSaleExtraSoloCoupleItemComponent', () => {
  let component: PreSaleExtraSoloCoupleItemComponent;
  let fixture: ComponentFixture<PreSaleExtraSoloCoupleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleExtraSoloCoupleItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleExtraSoloCoupleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
