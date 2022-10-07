import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBankTransferComponent } from './card-bank-transfer.component';

describe('CardBankTransferComponent', () => {
  let component: CardBankTransferComponent;
  let fixture: ComponentFixture<CardBankTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBankTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBankTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
