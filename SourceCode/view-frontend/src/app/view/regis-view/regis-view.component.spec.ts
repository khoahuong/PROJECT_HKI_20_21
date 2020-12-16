import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisViewComponent } from './regis-view.component';

describe('RegisViewComponent', () => {
  let component: RegisViewComponent;
  let fixture: ComponentFixture<RegisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
