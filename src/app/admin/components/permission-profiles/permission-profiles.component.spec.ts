import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionProfilesComponent } from './permission-profiles.component';

describe('PermissionProfilesComponent', () => {
  let component: PermissionProfilesComponent;
  let fixture: ComponentFixture<PermissionProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionProfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
