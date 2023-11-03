import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherOptionComponent } from './another-option.component';

describe('AnotherOptionComponent', () => {
  let component: AnotherOptionComponent;
  let fixture: ComponentFixture<AnotherOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotherOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
