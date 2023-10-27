import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesListAdminComponent } from './purchases-list-admin.component';

describe('PurchasesListAdminComponent', () => {
  let component: PurchasesListAdminComponent;
  let fixture: ComponentFixture<PurchasesListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
