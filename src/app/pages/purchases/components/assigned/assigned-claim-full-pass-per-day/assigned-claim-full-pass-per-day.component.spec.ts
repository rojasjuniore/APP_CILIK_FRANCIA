import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedClaimFullPassPerDayComponent } from './assigned-claim-full-pass-per-day.component';

describe('AssignedClaimFullPassPerDayComponent', () => {
  let component: AssignedClaimFullPassPerDayComponent;
  let fixture: ComponentFixture<AssignedClaimFullPassPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedClaimFullPassPerDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedClaimFullPassPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
