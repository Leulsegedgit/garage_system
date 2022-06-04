import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreIssueComponent } from './store-issue.component';

describe('StoreIssueComponent', () => {
  let component: StoreIssueComponent;
  let fixture: ComponentFixture<StoreIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
