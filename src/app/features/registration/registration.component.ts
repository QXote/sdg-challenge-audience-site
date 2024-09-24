import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackbarComponent} from "../../shared/components/error-snackbar/error-snackbar.component";
import {SuccessSnackbarComponent} from "../../shared/components/success-snackbar/success-snackbar.component";
import {RegistrationService} from "../../shared/services/registration.service";
import {Registration} from "../../shared/interfaces/registration";
import {SessionService} from "../../shared/services/session.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatRadioGroup,
    MatRadioButton,
    MatCheckbox,
    MatButton,
    FormsModule,
    MatError,
    MatDivider
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {

  private _snackBar = inject(MatSnackBar);
  private _router = inject(Router);
  private _registrationService = inject(RegistrationService);
  private _sessionService = inject(SessionService);

  sessionKey: string;

  registrationStatus: string = 'New'
  registrationType: string = 'Neither';
  registration: Registration = {
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    role: '',
    newsletterConsent: false,
    pictureConsent: false
  }

  ngOnInit(): void {
    this._sessionService.checkSession().then(({ sessionKey}) => {
      this.sessionKey = sessionKey;
    });
  }

  onSubmitForm(form: NgForm) {
    const setRegistration: Registration = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      organization: form.value.organization || '',
      role: this.registrationType === "Student" ? 'Student' : form.value.role || '',
      newsletterConsent: form.value.newsletterConsent,
      pictureConsent: form.value.pictureConsent
    }

    this._registrationService.setRegistration(setRegistration, this.sessionKey)
      .subscribe({
        next: () => {
          this._snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: "Registration successful!",
            panelClass: ['success-snackbar'],
            duration: 3000
          });
          this._router.navigate(['/information'])
          localStorage.setItem('email', form.value.email)
        },
        error: (error) => {
          this._snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: "Registration failed!",
            panelClass: ['error-snackbar'],
            duration: 3000
          });
        }
      })
  }

  onSubmitExistingForm(form: NgForm) {
    this._registrationService.checkEmailExists(form.value.email, this.sessionKey)
      .subscribe({
        next: (emailExists) => {
          if (emailExists) {
            this._snackBar.openFromComponent(SuccessSnackbarComponent, {
              data: "Re-entered session!",
              panelClass: ['success-snackbar'],
              duration: 3000
            });
            localStorage.setItem('email', form.value.email)
            this._router.navigate(['/information']);
          } else {
            this._snackBar.openFromComponent(ErrorSnackbarComponent, {
              data: "E-mail not found, please create a new registration!",
              panelClass: ['error-snackbar'],
              duration: 3000
            });
          }
        },
        error: (error) => {
          console.log(error);
          this._snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: "Email check failed!",
            panelClass: ['error-snackbar'],
            duration: 3000
          });
        }
      })
  }
}
