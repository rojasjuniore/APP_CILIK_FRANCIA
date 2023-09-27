import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherTimelineCardComponent } from './voucher-timeline-card.component';

describe('VoucherTimelineCardComponent', () => {
  let component: VoucherTimelineCardComponent;
  let fixture: ComponentFixture<VoucherTimelineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherTimelineCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherTimelineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
