import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlderHouseComponent } from './older-house.component';

describe('OlderHouseComponent', () => {
  let component: OlderHouseComponent;
  let fixture: ComponentFixture<OlderHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlderHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlderHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
