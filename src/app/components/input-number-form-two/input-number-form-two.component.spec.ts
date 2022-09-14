import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberFormTwoComponent } from './input-number-form-two.component';

describe('InputNumberFormTwoComponent', () => {
  let component: InputNumberFormTwoComponent;
  let fixture: ComponentFixture<InputNumberFormTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputNumberFormTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumberFormTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
