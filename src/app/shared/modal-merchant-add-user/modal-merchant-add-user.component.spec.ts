import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMerchantAddUserComponent } from './modal-merchant-add-user.component';

describe('ModalMerchantAddUserComponent', () => {
  let component: ModalMerchantAddUserComponent;
  let fixture: ComponentFixture<ModalMerchantAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMerchantAddUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMerchantAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
