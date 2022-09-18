import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveOrderOnBackButtonComponent } from './remove-order-on-back-button.component';

describe('RemoveOrderOnBackButtonComponent', () => {
  let component: RemoveOrderOnBackButtonComponent;
  let fixture: ComponentFixture<RemoveOrderOnBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveOrderOnBackButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveOrderOnBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
