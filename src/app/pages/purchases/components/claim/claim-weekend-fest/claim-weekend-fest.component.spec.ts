import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimWeekendFestComponent } from './claim-weekend-fest.component';

describe('ClaimWeekendFestComponent', () => {
  let component: ClaimWeekendFestComponent;
  let fixture: ComponentFixture<ClaimWeekendFestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimWeekendFestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimWeekendFestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
