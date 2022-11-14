import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyEventPassCardItemComponent } from './pre-sale-only-event-pass-card-item.component';

describe('PreSaleOnlyEventPassCardItemComponent', () => {
  let component: PreSaleOnlyEventPassCardItemComponent;
  let fixture: ComponentFixture<PreSaleOnlyEventPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyEventPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyEventPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
