import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsViewAdminComponent } from './installments-view-admin.component';

describe('InstallmentsViewAdminComponent', () => {
  let component: InstallmentsViewAdminComponent;
  let fixture: ComponentFixture<InstallmentsViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentsViewAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallmentsViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
