import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCategoryComponent } from './claim-category.component';

describe('ClaimCategoryComponent', () => {
  let component: ClaimCategoryComponent;
  let fixture: ComponentFixture<ClaimCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
