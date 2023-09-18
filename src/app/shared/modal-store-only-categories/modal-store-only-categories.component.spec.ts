import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStoreOnlyCategoriesComponent } from './modal-store-only-categories.component';

describe('ModalStoreOnlyCategoriesComponent', () => {
  let component: ModalStoreOnlyCategoriesComponent;
  let fixture: ComponentFixture<ModalStoreOnlyCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStoreOnlyCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStoreOnlyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
