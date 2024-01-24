import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimWeekendPassComponent } from './claim-weekend-pass.component';

describe('ClaimWeekendPassComponent', () => {
  let component: ClaimWeekendPassComponent;
  let fixture: ComponentFixture<ClaimWeekendPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimWeekendPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimWeekendPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
