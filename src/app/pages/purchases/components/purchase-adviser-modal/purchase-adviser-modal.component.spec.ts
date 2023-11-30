import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseAdviserModalComponent } from './purchase-adviser-modal.component';

describe('PurchaseAdviserModalComponent', () => {
  let component: PurchaseAdviserModalComponent;
  let fixture: ComponentFixture<PurchaseAdviserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseAdviserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseAdviserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
