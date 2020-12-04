import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegisComponent } from './popup-regis.component';

describe('PopupRegisComponent', () => {
  let component: PopupRegisComponent;
  let fixture: ComponentFixture<PopupRegisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupRegisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
