import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileformComponent } from './userprofileform.component';

describe('UserprofileformComponent', () => {
  let component: UserprofileformComponent;
  let fixture: ComponentFixture<UserprofileformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserprofileformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
