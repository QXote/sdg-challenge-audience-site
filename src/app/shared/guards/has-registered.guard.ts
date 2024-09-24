import { CanActivateFn } from '@angular/router';

export const hasRegisteredGuard: CanActivateFn = (route, state) => {


  return true;
};
