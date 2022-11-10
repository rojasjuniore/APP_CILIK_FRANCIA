import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyEventPassComponent } from './pre-sale-only-event-pass.component';

describe('PreSaleOnlyEventPassComponent', () => {
  let component: PreSaleOnlyEventPassComponent;
  let fixture: ComponentFixture<PreSaleOnlyEventPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyEventPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyEventPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
