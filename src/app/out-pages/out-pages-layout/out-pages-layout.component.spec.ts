import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutPagesLayoutComponent } from './out-pages-layout.component';

describe('OutPagesLayoutComponent', () => {
  let component: OutPagesLayoutComponent;
  let fixture: ComponentFixture<OutPagesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutPagesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutPagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
