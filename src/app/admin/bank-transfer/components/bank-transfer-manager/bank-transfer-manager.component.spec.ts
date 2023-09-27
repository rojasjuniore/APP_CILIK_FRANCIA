import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransferManagerComponent } from './bank-transfer-manager.component';

describe('BankTransferManagerComponent', () => {
  let component: BankTransferManagerComponent;
  let fixture: ComponentFixture<BankTransferManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankTransferManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankTransferManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
