import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCompanyInvoiceComponent } from './generate-company-invoice.component';

describe('GenerateCompanyInvoiceComponent', () => {
  let component: GenerateCompanyInvoiceComponent;
  let fixture: ComponentFixture<GenerateCompanyInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateCompanyInvoiceComponent]
    });
    fixture = TestBed.createComponent(GenerateCompanyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
