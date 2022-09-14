import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSalePackagesListComponent } from './pre-sale-packages-list.component';

describe('PreSalePackagesListComponent', () => {
  let component: PreSalePackagesListComponent;
  let fixture: ComponentFixture<PreSalePackagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSalePackagesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSalePackagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
