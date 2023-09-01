import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TucompraComponent } from './tucompra.component';

describe('TucompraComponent', () => {
  let component: TucompraComponent;
  let fixture: ComponentFixture<TucompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TucompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TucompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
