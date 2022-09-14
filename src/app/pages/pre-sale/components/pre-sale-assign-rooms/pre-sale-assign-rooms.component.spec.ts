import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleAssignRoomsComponent } from './pre-sale-assign-rooms.component';

describe('PreSaleAssignRoomsComponent', () => {
  let component: PreSaleAssignRoomsComponent;
  let fixture: ComponentFixture<PreSaleAssignRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleAssignRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleAssignRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
