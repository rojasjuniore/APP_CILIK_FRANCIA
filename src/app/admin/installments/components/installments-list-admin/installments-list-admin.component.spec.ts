import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsListAdminComponent } from './installments-list-admin.component';

describe('InstallmentsListAdminComponent', () => {
  let component: InstallmentsListAdminComponent;
  let fixture: ComponentFixture<InstallmentsListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentsListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallmentsListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
