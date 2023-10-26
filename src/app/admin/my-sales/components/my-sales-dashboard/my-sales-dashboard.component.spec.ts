import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalesDashboardComponent } from './my-sales-dashboard.component';

describe('MySalesDashboardComponent', () => {
  let component: MySalesDashboardComponent;
  let fixture: ComponentFixture<MySalesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySalesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySalesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
