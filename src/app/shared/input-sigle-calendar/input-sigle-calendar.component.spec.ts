import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSigleCalendarComponent } from './input-sigle-calendar.component';

describe('InputSigleCalendarComponent', () => {
  let component: InputSigleCalendarComponent;
  let fixture: ComponentFixture<InputSigleCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSigleCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSigleCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
