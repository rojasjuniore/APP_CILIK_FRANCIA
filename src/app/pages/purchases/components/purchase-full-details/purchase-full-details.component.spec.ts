import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFullDetailsComponent } from './purchase-full-details.component';

describe('PurchaseFullDetailsComponent', () => {
  let component: PurchaseFullDetailsComponent;
  let fixture: ComponentFixture<PurchaseFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseFullDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
