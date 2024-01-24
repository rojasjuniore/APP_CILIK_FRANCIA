import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedWeekendPassComponent } from './assigned-weekend-pass.component';

describe('AssignedWeekendPassComponent', () => {
  let component: AssignedWeekendPassComponent;
  let fixture: ComponentFixture<AssignedWeekendPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedWeekendPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedWeekendPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
