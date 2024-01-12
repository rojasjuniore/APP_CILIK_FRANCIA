import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclaimedComponent } from './reclaimed.component';

describe('ReclaimedComponent', () => {
  let component: ReclaimedComponent;
  let fixture: ComponentFixture<ReclaimedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclaimedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclaimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
