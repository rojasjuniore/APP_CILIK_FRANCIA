import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekendFestCardItemComponent } from './weekend-fest-card-item.component';

describe('WeekendFestCardItemComponent', () => {
  let component: WeekendFestCardItemComponent;
  let fixture: ComponentFixture<WeekendFestCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekendFestCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekendFestCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
