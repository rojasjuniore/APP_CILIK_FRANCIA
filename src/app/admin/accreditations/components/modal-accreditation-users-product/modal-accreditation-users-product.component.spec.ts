import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccreditationUsersProductComponent } from './modal-accreditation-users-product.component';

describe('ModalAccreditationUsersProductComponent', () => {
  let component: ModalAccreditationUsersProductComponent;
  let fixture: ComponentFixture<ModalAccreditationUsersProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAccreditationUsersProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAccreditationUsersProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
