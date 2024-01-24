import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationUsersComponent } from './accreditation-users.component';

describe('AccreditationUsersComponent', () => {
  let component: AccreditationUsersComponent;
  let fixture: ComponentFixture<AccreditationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditationUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccreditationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
