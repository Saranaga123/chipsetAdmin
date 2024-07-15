import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPopComponent } from './add-product-pop.component';

describe('AddProductPopComponent', () => {
  let component: AddProductPopComponent;
  let fixture: ComponentFixture<AddProductPopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductPopComponent]
    });
    fixture = TestBed.createComponent(AddProductPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
