import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {AuthService} from "../../../shared/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-access-code-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './access-code-dialog.component.html',
  styleUrl: './access-code-dialog.component.scss'
})
export class AccessCodeDialogComponent {
  accessCode: string = '';

  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  constructor(
    public dialogRef: MatDialogRef<AccessCodeDialogComponent>,
  ) {
    this.dialogRef.disableClose = false;
  }

  // verifyAccessCode(accessCode: string) {
  //   this.authService.accessCodeIsValid(accessCode).subscribe({
  //     next: (session) => {
  //       if (session) {
  //         this.snackBar.openFromComponent(SuccessSnackbarComponent, {
  //           data: "Access code accepted",
  //           panelClass: ['success-snackbar'],
  //           duration: 3000
  //         });
  //         localStorage.setItem('accessCode', this.accessCode);
  //         localStorage.setItem('session', session);
  //         this.dialogRef.close();
  //       } else {
  //         this.snackBar.openFromComponent(SuccessSnackbarComponent, {
  //           data: "Access code is incorrect",
  //           panelClass: ['success-snackbar'],
  //           duration: 3000
  //         });
  //       }
  //     },
  //     error: (error) => {
  //       this.snackBar.openFromComponent(ErrorSnackbarComponent, {
  //         data: "Error verifying access code",
  //         panelClass: ['error-snackbar'],
  //         duration: 3000
  //       });
  //       console.log(error)
  //     }
  //   });
  // }
}
