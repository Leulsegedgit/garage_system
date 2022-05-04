import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidnavComponent } from './dashboard-sidnav.component';

describe('DashboardSidnavComponent', () => {
  let component: DashboardSidnavComponent;
  let fixture: ComponentFixture<DashboardSidnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSidnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
