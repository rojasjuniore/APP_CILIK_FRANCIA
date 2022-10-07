import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRolesAddComponent } from './permission-roles-add.component';

describe('PermissionRolesAddComponent', () => {
  let component: PermissionRolesAddComponent;
  let fixture: ComponentFixture<PermissionRolesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionRolesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionRolesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
