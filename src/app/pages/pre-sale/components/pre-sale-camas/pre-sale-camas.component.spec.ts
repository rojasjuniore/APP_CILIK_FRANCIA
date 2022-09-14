import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCamasComponent } from './pre-sale-camas.component';

describe('PreSaleCamasComponent', () => {
  let component: PreSaleCamasComponent;
  let fixture: ComponentFixture<PreSaleCamasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCamasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleCamasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
