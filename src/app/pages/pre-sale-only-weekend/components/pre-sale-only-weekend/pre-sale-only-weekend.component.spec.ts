import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyWeekendComponent } from './pre-sale-only-weekend.component';

describe('PreSaleOnlyWeekendComponent', () => {
  let component: PreSaleOnlyWeekendComponent;
  let fixture: ComponentFixture<PreSaleOnlyWeekendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyWeekendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyWeekendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
