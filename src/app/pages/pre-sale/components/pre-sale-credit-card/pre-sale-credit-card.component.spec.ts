import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCreditCardComponent } from './pre-sale-credit-card.component';

describe('PreSaleCreditCardComponent', () => {
  let component: PreSaleCreditCardComponent;
  let fixture: ComponentFixture<PreSaleCreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCreditCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
