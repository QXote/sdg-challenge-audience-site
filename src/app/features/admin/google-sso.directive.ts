import {Directive, HostListener, inject} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Directive({
  selector: '[appGoogleSso]',
  standalone: true
})
export class GoogleSsoDirective {

  private _authService = inject(AuthService);
  private _router = inject(Router);

  @HostListener('click')
  async onClick() {
    let isAdmin = await this._authService.googleSignIn();

    if (isAdmin) {
      await this._router.navigate(['/admin/manage-session']);
    }
  }
}
