import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedWeekendFestComponent } from './assigned-weekend-fest.component';

describe('AssignedWeekendFestComponent', () => {
  let component: AssignedWeekendFestComponent;
  let fixture: ComponentFixture<AssignedWeekendFestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedWeekendFestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedWeekendFestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
