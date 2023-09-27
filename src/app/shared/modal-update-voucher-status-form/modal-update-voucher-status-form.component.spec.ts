import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateVoucherStatusFormComponent } from './modal-update-voucher-status-form.component';

describe('ModalUpdateVoucherStatusFormComponent', () => {
  let component: ModalUpdateVoucherStatusFormComponent;
  let fixture: ComponentFixture<ModalUpdateVoucherStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateVoucherStatusFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateVoucherStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
