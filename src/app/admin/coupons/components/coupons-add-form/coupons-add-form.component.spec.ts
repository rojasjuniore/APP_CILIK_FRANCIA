import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsAddFormComponent } from './coupons-add-form.component';

describe('CouponsAddFormComponent', () => {
  let component: CouponsAddFormComponent;
  let fixture: ComponentFixture<CouponsAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
