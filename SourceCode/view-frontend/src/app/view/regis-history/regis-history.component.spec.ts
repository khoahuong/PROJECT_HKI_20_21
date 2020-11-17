import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisHistoryComponent } from './regis-history.component';

describe('RegisHistoryComponent', () => {
  let component: RegisHistoryComponent;
  let fixture: ComponentFixture<RegisHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
