import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalesViewComponent } from './my-sales-view.component';

describe('MySalesViewComponent', () => {
  let component: MySalesViewComponent;
  let fixture: ComponentFixture<MySalesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySalesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySalesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
