import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareRegistrationComponent } from './spare-registration.component';

describe('SpareRegistrationComponent', () => {
  let component: SpareRegistrationComponent;
  let fixture: ComponentFixture<SpareRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpareRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpareRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
