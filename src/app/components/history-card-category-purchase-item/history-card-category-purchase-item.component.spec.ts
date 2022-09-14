import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCardCategoryPurchaseItemComponent } from './history-card-category-purchase-item.component';

describe('HistoryCardCategoryPurchaseItemComponent', () => {
  let component: HistoryCardCategoryPurchaseItemComponent;
  let fixture: ComponentFixture<HistoryCardCategoryPurchaseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCardCategoryPurchaseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCardCategoryPurchaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
