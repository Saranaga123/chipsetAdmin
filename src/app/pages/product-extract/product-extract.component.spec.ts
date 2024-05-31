import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExtractComponent } from './product-extract.component';

describe('ProductExtractComponent', () => {
  let component: ProductExtractComponent;
  let fixture: ComponentFixture<ProductExtractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductExtractComponent]
    });
    fixture = TestBed.createComponent(ProductExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
