import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegisComponent } from './view-regis.component';

describe('ViewRegisComponent', () => {
  let component: ViewRegisComponent;
  let fixture: ComponentFixture<ViewRegisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRegisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
