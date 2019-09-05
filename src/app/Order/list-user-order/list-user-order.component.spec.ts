import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserOrderComponent } from './list-user-order.component';

describe('ListUserOrderComponent', () => {
  let component: ListUserOrderComponent;
  let fixture: ComponentFixture<ListUserOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
