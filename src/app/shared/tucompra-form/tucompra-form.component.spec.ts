import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TucompraFormComponent } from './tucompra-form.component';

describe('TucompraFormComponent', () => {
  let component: TucompraFormComponent;
  let fixture: ComponentFixture<TucompraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TucompraFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TucompraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
