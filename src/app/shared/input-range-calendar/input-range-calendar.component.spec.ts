import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRangeCalendarComponent } from './input-range-calendar.component';

describe('InputRangeCalendarComponent', () => {
  let component: InputRangeCalendarComponent;
  let fixture: ComponentFixture<InputRangeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRangeCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRangeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
