import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareRegistrationEditComponent } from './spare-registration-edit.component';

describe('SpareRegistrationEditComponent', () => {
  let component: SpareRegistrationEditComponent;
  let fixture: ComponentFixture<SpareRegistrationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpareRegistrationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpareRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
