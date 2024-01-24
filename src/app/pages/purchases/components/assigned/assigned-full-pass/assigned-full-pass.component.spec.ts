import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedFullPassComponent } from './assigned-full-pass.component';

describe('AssignedFullPassComponent', () => {
  let component: AssignedFullPassComponent;
  let fixture: ComponentFixture<AssignedFullPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedFullPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedFullPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
