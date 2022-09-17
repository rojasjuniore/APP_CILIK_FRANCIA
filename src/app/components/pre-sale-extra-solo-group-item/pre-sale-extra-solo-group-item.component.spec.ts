import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleExtraSoloGroupItemComponent } from './pre-sale-extra-solo-group-item.component';

describe('PreSaleExtraSoloGroupItemComponent', () => {
  let component: PreSaleExtraSoloGroupItemComponent;
  let fixture: ComponentFixture<PreSaleExtraSoloGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleExtraSoloGroupItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleExtraSoloGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
