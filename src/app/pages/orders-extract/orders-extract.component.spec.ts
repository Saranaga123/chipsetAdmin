import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersExtractComponent } from './orders-extract.component';

describe('OrdersExtractComponent', () => {
  let component: OrdersExtractComponent;
  let fixture: ComponentFixture<OrdersExtractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersExtractComponent]
    });
    fixture = TestBed.createComponent(OrdersExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
