import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseWeekendPassCardItemComponent } from './purchase-weekend-pass-card-item.component';

describe('PurchaseWeekendPassCardItemComponent', () => {
  let component: PurchaseWeekendPassCardItemComponent;
  let fixture: ComponentFixture<PurchaseWeekendPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseWeekendPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseWeekendPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
