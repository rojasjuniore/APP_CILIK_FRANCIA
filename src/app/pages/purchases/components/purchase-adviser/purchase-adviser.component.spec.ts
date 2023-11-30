import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseAdviserComponent } from './purchase-adviser.component';

describe('PurchaseAdviserComponent', () => {
  let component: PurchaseAdviserComponent;
  let fixture: ComponentFixture<PurchaseAdviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseAdviserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
