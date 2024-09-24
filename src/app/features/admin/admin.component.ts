import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {GoogleSsoDirective} from "./google-sso.directive";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    GoogleSsoDirective
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  private _authService = inject(AuthService);
  private _router = inject(Router);

  ngOnInit(): void {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/admin/manage-session']);
    }
  }

}
