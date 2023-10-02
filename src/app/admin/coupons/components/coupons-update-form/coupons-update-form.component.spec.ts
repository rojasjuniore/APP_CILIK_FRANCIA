import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsUpdateFormComponent } from './coupons-update-form.component';

describe('CouponsUpdateFormComponent', () => {
  let component: CouponsUpdateFormComponent;
  let fixture: ComponentFixture<CouponsUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
