import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRolesUpdateComponent } from './permission-roles-update.component';

describe('PermissionRolesUpdateComponent', () => {
  let component: PermissionRolesUpdateComponent;
  let fixture: ComponentFixture<PermissionRolesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionRolesUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionRolesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
