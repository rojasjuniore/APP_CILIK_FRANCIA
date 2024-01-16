import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsmyRegisteredDivisionsComponent } from './componentsmy-registered-divisions.component';

describe('ComponentsmyRegisteredDivisionsComponent', () => {
  let component: ComponentsmyRegisteredDivisionsComponent;
  let fixture: ComponentFixture<ComponentsmyRegisteredDivisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsmyRegisteredDivisionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsmyRegisteredDivisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
