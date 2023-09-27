import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherCardItemComponent } from './voucher-card-item.component';

describe('VoucherCardItemComponent', () => {
  let component: VoucherCardItemComponent;
  let fixture: ComponentFixture<VoucherCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
