import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFullPassPerDayComponent } from './modal-full-pass-per-day.component';

describe('ModalFullPassPerDayComponent', () => {
  let component: ModalFullPassPerDayComponent;
  let fixture: ComponentFixture<ModalFullPassPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFullPassPerDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFullPassPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
