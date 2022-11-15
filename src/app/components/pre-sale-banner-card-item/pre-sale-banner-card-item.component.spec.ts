import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleBannerCardItemComponent } from './pre-sale-banner-card-item.component';

describe('PreSaleBannerCardItemComponent', () => {
  let component: PreSaleBannerCardItemComponent;
  let fixture: ComponentFixture<PreSaleBannerCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleBannerCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleBannerCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
