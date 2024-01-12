import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSearchUserComponent } from './claim-search-user.component';

describe('ClaimSearchUserComponent', () => {
  let component: ClaimSearchUserComponent;
  let fixture: ComponentFixture<ClaimSearchUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimSearchUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimSearchUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
