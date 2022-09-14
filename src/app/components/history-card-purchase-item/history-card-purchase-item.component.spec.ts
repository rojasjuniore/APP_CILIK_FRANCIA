import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCardPurchaseItemComponent } from './history-card-purchase-item.component';

describe('HistoryCardPurchaseItemComponent', () => {
  let component: HistoryCardPurchaseItemComponent;
  let fixture: ComponentFixture<HistoryCardPurchaseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCardPurchaseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCardPurchaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
