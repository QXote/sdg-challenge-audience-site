import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasRegisteredGuard } from './has-registered.guard';

describe('hasRegisteredGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasRegisteredGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
