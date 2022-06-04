import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReceiveComponent } from './store-receive.component';

describe('StoreReceiveComponent', () => {
  let component: StoreReceiveComponent;
  let fixture: ComponentFixture<StoreReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
