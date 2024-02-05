import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryClaimsComponent } from './category-claims.component';

describe('CategoryClaimsComponent', () => {
  let component: CategoryClaimsComponent;
  let fixture: ComponentFixture<CategoryClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryClaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
