import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFullPassComponent } from './claim-full-pass.component';

describe('ClaimFullPassComponent', () => {
  let component: ClaimFullPassComponent;
  let fixture: ComponentFixture<ClaimFullPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimFullPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimFullPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
