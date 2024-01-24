import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccreditedUsersComponent } from './modal-accredited-users.component';

describe('ModalAccreditedUsersComponent', () => {
  let component: ModalAccreditedUsersComponent;
  let fixture: ComponentFixture<ModalAccreditedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAccreditedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAccreditedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
