import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReceiveEditComponent } from './store-receive-edit.component';

describe('StoreReceiveEditComponent', () => {
  let component: StoreReceiveEditComponent;
  let fixture: ComponentFixture<StoreReceiveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreReceiveEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReceiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
