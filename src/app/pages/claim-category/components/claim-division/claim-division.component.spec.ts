import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDivisionComponent } from './claim-division.component';

describe('ClaimDivisionComponent', () => {
  let component: ClaimDivisionComponent;
  let fixture: ComponentFixture<ClaimDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
