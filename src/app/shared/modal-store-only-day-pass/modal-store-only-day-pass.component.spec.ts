import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStoreOnlyDayPassComponent } from './modal-store-only-day-pass.component';

describe('ModalStoreOnlyDayPassComponent', () => {
  let component: ModalStoreOnlyDayPassComponent;
  let fixture: ComponentFixture<ModalStoreOnlyDayPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStoreOnlyDayPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStoreOnlyDayPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
