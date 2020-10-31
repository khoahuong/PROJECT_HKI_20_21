import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisEditComponent } from './regis-edit.component';

describe('RegisEditComponent', () => {
  let component: RegisEditComponent;
  let fixture: ComponentFixture<RegisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
