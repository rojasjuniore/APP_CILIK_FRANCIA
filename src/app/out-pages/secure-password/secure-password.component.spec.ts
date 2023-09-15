import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurePasswordComponent } from './secure-password.component';

describe('SecurePasswordComponent', () => {
  let component: SecurePasswordComponent;
  let fixture: ComponentFixture<SecurePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
