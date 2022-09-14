import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleModalRoomTypeDetailsComponent } from './pre-sale-modal-room-type-details.component';

describe('PreSaleModalRoomTypeDetailsComponent', () => {
  let component: PreSaleModalRoomTypeDetailsComponent;
  let fixture: ComponentFixture<PreSaleModalRoomTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleModalRoomTypeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleModalRoomTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
