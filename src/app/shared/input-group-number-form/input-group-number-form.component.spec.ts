import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGroupNumberFormComponent } from './input-group-number-form.component';

describe('InputGroupNumberFormComponent', () => {
  let component: InputGroupNumberFormComponent;
  let fixture: ComponentFixture<InputGroupNumberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputGroupNumberFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputGroupNumberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
