import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseListItemCardAdminComponent } from './purchase-list-item-card-admin.component';

describe('PurchaseListItemCardAdminComponent', () => {
  let component: PurchaseListItemCardAdminComponent;
  let fixture: ComponentFixture<PurchaseListItemCardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseListItemCardAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseListItemCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
