import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWeekenFestComponent } from './modal-weeken-fest.component';

describe('ModalWeekenFestComponent', () => {
  let component: ModalWeekenFestComponent;
  let fixture: ComponentFixture<ModalWeekenFestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWeekenFestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWeekenFestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
