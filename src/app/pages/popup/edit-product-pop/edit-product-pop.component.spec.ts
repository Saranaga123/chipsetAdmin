import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductPopComponent } from './edit-product-pop.component';

describe('EditProductPopComponent', () => {
  let component: EditProductPopComponent;
  let fixture: ComponentFixture<EditProductPopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductPopComponent]
    });
    fixture = TestBed.createComponent(EditProductPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
