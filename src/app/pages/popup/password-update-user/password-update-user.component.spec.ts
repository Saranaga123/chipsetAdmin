import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordUpdateUserComponent } from './password-update-user.component';

describe('PasswordUpdateUserComponent', () => {
  let component: PasswordUpdateUserComponent;
  let fixture: ComponentFixture<PasswordUpdateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordUpdateUserComponent]
    });
    fixture = TestBed.createComponent(PasswordUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
