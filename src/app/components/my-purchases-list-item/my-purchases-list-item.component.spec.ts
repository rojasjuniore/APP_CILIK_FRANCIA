import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPurchasesListItemComponent } from './my-purchases-list-item.component';

describe('MyPurchasesListItemComponent', () => {
  let component: MyPurchasesListItemComponent;
  let fixture: ComponentFixture<MyPurchasesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPurchasesListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPurchasesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
