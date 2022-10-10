import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRolesRemoveComponent } from './permission-roles-remove.component';

describe('PermissionRolesRemoveComponent', () => {
  let component: PermissionRolesRemoveComponent;
  let fixture: ComponentFixture<PermissionRolesRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionRolesRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionRolesRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
