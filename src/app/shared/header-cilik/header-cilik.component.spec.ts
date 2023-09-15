import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCilikComponent } from './header-cilik.component';

describe('HeaderCilikComponent', () => {
  let component: HeaderCilikComponent;
  let fixture: ComponentFixture<HeaderCilikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCilikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCilikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
