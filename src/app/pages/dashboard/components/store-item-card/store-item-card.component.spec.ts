import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreItemCardComponent } from './store-item-card.component';

describe('StoreItemCardComponent', () => {
  let component: StoreItemCardComponent;
  let fixture: ComponentFixture<StoreItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
