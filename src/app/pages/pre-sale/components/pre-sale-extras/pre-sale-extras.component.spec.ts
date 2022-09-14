import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleExtrasComponent } from './pre-sale-extras.component';

describe('PreSaleExtrasComponent', () => {
  let component: PreSaleExtrasComponent;
  let fixture: ComponentFixture<PreSaleExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleExtrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
