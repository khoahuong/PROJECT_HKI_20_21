import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisIndexComponent } from './regis-index.component';

describe('RegisIndexComponent', () => {
  let component: RegisIndexComponent;
  let fixture: ComponentFixture<RegisIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
