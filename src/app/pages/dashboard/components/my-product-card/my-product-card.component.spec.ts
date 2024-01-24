import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductCardComponent } from './my-product-card.component';

describe('MyProductCardComponent', () => {
  let component: MyProductCardComponent;
  let fixture: ComponentFixture<MyProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
