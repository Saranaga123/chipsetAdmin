import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersExtractComponent } from './users-extract.component';

describe('UsersExtractComponent', () => {
  let component: UsersExtractComponent;
  let fixture: ComponentFixture<UsersExtractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersExtractComponent]
    });
    fixture = TestBed.createComponent(UsersExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
