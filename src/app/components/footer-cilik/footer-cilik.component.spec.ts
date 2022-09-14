import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCilikComponent } from './footer-cilik.component';

describe('FooterCilikComponent', () => {
  let component: FooterCilikComponent;
  let fixture: ComponentFixture<FooterCilikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterCilikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCilikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
