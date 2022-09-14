import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlanDetailsComponent } from './modal-plan-details.component';

describe('ModalPlanDetailsComponent', () => {
  let component: ModalPlanDetailsComponent;
  let fixture: ComponentFixture<ModalPlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPlanDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
