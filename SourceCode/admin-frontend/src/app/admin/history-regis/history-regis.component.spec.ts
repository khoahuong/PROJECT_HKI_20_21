import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRegisComponent } from './history-regis.component';

describe('HistoryRegisComponent', () => {
  let component: HistoryRegisComponent;
  let fixture: ComponentFixture<HistoryRegisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryRegisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
