import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFullPassPerDayComponent } from './claim-full-pass-per-day.component';

describe('ClaimFullPassPerDayComponent', () => {
  let component: ClaimFullPassPerDayComponent;
  let fixture: ComponentFixture<ClaimFullPassPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimFullPassPerDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimFullPassPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
