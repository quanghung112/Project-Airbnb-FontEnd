import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailInPostComponent } from './user-detail-in-post.component';

describe('UserDetailInPostComponent', () => {
  let component: UserDetailInPostComponent;
  let fixture: ComponentFixture<UserDetailInPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailInPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailInPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
