import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalesBenefitsComponent } from './my-sales-benefits.component';

describe('MySalesBenefitsComponent', () => {
  let component: MySalesBenefitsComponent;
  let fixture: ComponentFixture<MySalesBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySalesBenefitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySalesBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
