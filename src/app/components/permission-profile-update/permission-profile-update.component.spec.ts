import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionProfileUpdateComponent } from './permission-profile-update.component';

describe('PermissionProfileUpdateComponent', () => {
  let component: PermissionProfileUpdateComponent;
  let fixture: ComponentFixture<PermissionProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionProfileUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
