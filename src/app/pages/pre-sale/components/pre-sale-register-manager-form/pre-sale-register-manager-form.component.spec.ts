import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleRegisterManagerFormComponent } from './pre-sale-register-manager-form.component';

describe('PreSaleRegisterManagerFormComponent', () => {
  let component: PreSaleRegisterManagerFormComponent;
  let fixture: ComponentFixture<PreSaleRegisterManagerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleRegisterManagerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleRegisterManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
