import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleExtraSoloCardItemComponent } from './pre-sale-extra-solo-card-item.component';

describe('PreSaleExtraSoloCardItemComponent', () => {
  let component: PreSaleExtraSoloCardItemComponent;
  let fixture: ComponentFixture<PreSaleExtraSoloCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleExtraSoloCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleExtraSoloCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
