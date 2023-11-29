import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserCheckoutComponent } from './adviser-checkout.component';

describe('AdviserCheckoutComponent', () => {
  let component: AdviserCheckoutComponent;
  let fixture: ComponentFixture<AdviserCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviserCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
