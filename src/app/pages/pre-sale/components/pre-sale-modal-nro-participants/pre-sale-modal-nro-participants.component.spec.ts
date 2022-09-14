import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleModalNroParticipantsComponent } from './pre-sale-modal-nro-participants.component';

describe('PreSaleModalNroParticipantsComponent', () => {
  let component: PreSaleModalNroParticipantsComponent;
  let fixture: ComponentFixture<PreSaleModalNroParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleModalNroParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleModalNroParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
