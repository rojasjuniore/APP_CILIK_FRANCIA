import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTitleCardItemComponent } from './purchase-title-card-item.component';

describe('PurchaseTitleCardItemComponent', () => {
  let component: PurchaseTitleCardItemComponent;
  let fixture: ComponentFixture<PurchaseTitleCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseTitleCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseTitleCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
