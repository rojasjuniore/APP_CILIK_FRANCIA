import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleModalTipoCamaComponent } from './pre-sale-modal-tipo-cama.component';

describe('PreSaleModalTipoCamaComponent', () => {
  let component: PreSaleModalTipoCamaComponent;
  let fixture: ComponentFixture<PreSaleModalTipoCamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleModalTipoCamaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleModalTipoCamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
