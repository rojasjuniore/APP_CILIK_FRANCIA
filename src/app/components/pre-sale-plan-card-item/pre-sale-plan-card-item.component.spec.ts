import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSalePlanCardItemComponent } from './pre-sale-plan-card-item.component';

describe('PreSalePlanCardItemComponent', () => {
  let component: PreSalePlanCardItemComponent;
  let fixture: ComponentFixture<PreSalePlanCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSalePlanCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSalePlanCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
