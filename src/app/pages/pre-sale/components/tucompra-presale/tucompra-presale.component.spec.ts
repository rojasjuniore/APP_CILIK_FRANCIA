import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TucompraPresaleComponent } from './tucompra-presale.component';

describe('TucompraPresaleComponent', () => {
  let component: TucompraPresaleComponent;
  let fixture: ComponentFixture<TucompraPresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TucompraPresaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TucompraPresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
