import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleTotalesComponent } from './pre-sale-totales.component';

describe('PreSaleTotalesComponent', () => {
  let component: PreSaleTotalesComponent;
  let fixture: ComponentFixture<PreSaleTotalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleTotalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
