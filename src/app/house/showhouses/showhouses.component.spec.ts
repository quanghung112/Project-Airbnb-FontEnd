import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowhousesComponent } from './showhouses.component';

describe('ShowhousesComponent', () => {
  let component: ShowhousesComponent;
  let fixture: ComponentFixture<ShowhousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowhousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowhousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
