import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisEditPopupComponent } from './regis-edit-popup.component';

describe('RegisEditPopupComponent', () => {
  let component: RegisEditPopupComponent;
  let fixture: ComponentFixture<RegisEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisEditPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
