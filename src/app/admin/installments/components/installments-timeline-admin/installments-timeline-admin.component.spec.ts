import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsTimelineAdminComponent } from './installments-timeline-admin.component';

describe('InstallmentsTimelineAdminComponent', () => {
  let component: InstallmentsTimelineAdminComponent;
  let fixture: ComponentFixture<InstallmentsTimelineAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentsTimelineAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallmentsTimelineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
