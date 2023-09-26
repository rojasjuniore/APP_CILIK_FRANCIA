import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputFileComponent } from './custom-input-file.component';

describe('CustomInputFileComponent', () => {
  let component: CustomInputFileComponent;
  let fixture: ComponentFixture<CustomInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomInputFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
