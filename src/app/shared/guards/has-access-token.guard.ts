import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {inject} from "@angular/core";

export const hasAccessTokenGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);


  return new RedirectCommand(router.parseUrl('/unauthorized'), {
    skipLocationChange: true
  });
};
