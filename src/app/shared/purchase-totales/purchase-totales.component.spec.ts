import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTotalesComponent } from './purchase-totales.component';

describe('PurchaseTotalesComponent', () => {
  let component: PurchaseTotalesComponent;
  let fixture: ComponentFixture<PurchaseTotalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseTotalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
