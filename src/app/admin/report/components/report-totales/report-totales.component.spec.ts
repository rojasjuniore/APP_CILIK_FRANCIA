import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTotalesComponent } from './ReportTotalesComponent';

describe('ReportTotalesComponent', () => {
  let component: ReportTotalesComponent;
  let fixture: ComponentFixture<ReportTotalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTotalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
