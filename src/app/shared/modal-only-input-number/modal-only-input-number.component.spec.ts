import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOnlyInputNumberComponent } from './modal-only-input-number.component';

describe('ModalOnlyInputNumberComponent', () => {
  let component: ModalOnlyInputNumberComponent;
  let fixture: ComponentFixture<ModalOnlyInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOnlyInputNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOnlyInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
