import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAndEventComponent } from './hotel-and-event.component';

describe('HotelAndEventComponent', () => {
  let component: HotelAndEventComponent;
  let fixture: ComponentFixture<HotelAndEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelAndEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelAndEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
