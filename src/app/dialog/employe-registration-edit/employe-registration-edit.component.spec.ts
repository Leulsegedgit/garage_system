import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeRegistrationEditComponent } from './employe-registration-edit.component';

describe('EmployeRegistrationEditComponent', () => {
  let component: EmployeRegistrationEditComponent;
  let fixture: ComponentFixture<EmployeRegistrationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeRegistrationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
