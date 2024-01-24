import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditedCategoriesComponent } from './accredited-categories.component';

describe('AccreditedCategoriesComponent', () => {
  let component: AccreditedCategoriesComponent;
  let fixture: ComponentFixture<AccreditedCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditedCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccreditedCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
