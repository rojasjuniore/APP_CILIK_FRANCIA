import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedHotelComponent } from './assigned-hotel.component';

describe('AssignedHotelComponent', () => {
  let component: AssignedHotelComponent;
  let fixture: ComponentFixture<AssignedHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
