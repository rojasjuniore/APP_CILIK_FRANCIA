import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCryptoComponent } from './pre-sale-crypto.component';

describe('PreSaleCryptoComponent', () => {
  let component: PreSaleCryptoComponent;
  let fixture: ComponentFixture<PreSaleCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
