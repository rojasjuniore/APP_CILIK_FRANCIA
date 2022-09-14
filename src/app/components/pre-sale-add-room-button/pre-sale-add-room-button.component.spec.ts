import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleAddRoomButtonComponent } from './pre-sale-add-room-button.component';

describe('PreSaleAddRoomButtonComponent', () => {
  let component: PreSaleAddRoomButtonComponent;
  let fixture: ComponentFixture<PreSaleAddRoomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleAddRoomButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleAddRoomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
