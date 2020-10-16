import { TestBed } from "@angular/core/testing"

import { ToastUltilsService } from './toast-ultils.service';

describe('ToastUltilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastUltilsService = TestBed.get(ToastUltilsService);
    expect(service).toBeTruthy();
  });
})
