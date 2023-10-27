import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesDasdboardComponent } from './purchases-dasdboard.component';

describe('PurchasesDasdboardComponent', () => {
  let component: PurchasesDasdboardComponent;
  let fixture: ComponentFixture<PurchasesDasdboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesDasdboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesDasdboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
