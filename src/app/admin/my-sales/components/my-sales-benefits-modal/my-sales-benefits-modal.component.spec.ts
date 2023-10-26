import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalesBenefitsModalComponent } from './my-sales-benefits-modal.component';

describe('MySalesBenefitsModalComponent', () => {
  let component: MySalesBenefitsModalComponent;
  let fixture: ComponentFixture<MySalesBenefitsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySalesBenefitsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySalesBenefitsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
