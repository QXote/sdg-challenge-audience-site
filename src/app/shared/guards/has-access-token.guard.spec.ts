import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasAccessTokenGuard } from './has-access-token.guard';

describe('hasAccessTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasAccessTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
