import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseListItemCardComponent } from './purchase-list-item-card.component';

describe('PurchaseListItemCardComponent', () => {
  let component: PurchaseListItemCardComponent;
  let fixture: ComponentFixture<PurchaseListItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseListItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseListItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
