import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHotelComponent } from './claim-hotel.component';

describe('ClaimHotelComponent', () => {
  let component: ClaimHotelComponent;
  let fixture: ComponentFixture<ClaimHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
