import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyEventPassTucompraComponent } from './pre-sale-only-event-pass-tucompra.component';

describe('PreSaleOnlyEventPassTucompraComponent', () => {
  let component: PreSaleOnlyEventPassTucompraComponent;
  let fixture: ComponentFixture<PreSaleOnlyEventPassTucompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyEventPassTucompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyEventPassTucompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
