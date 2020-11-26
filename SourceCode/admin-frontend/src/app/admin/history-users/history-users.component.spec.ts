import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryUsersComponent } from './history-users.component';

describe('HistoryUsersComponent', () => {
  let component: HistoryUsersComponent;
  let fixture: ComponentFixture<HistoryUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
