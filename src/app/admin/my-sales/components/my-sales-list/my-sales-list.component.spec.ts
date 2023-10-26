import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalesListComponent } from './my-sales-list.component';

describe('MySalesListComponent', () => {
  let component: MySalesListComponent;
  let fixture: ComponentFixture<MySalesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySalesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
