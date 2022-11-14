import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyEventPassSelectComponent } from './pre-sale-only-event-pass-select.component';

describe('PreSaleOnlyEventPassSelectComponent', () => {
  let component: PreSaleOnlyEventPassSelectComponent;
  let fixture: ComponentFixture<PreSaleOnlyEventPassSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyEventPassSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyEventPassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
