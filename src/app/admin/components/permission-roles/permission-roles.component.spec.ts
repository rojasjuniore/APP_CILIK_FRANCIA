import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRolesComponent } from './permission-roles.component';

describe('PermissionRolesComponent', () => {
  let component: PermissionRolesComponent;
  let fixture: ComponentFixture<PermissionRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
