import {Component, inject, Inject} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-error-snackbar',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarAction,
    MatButton,
    MatSnackBarActions
  ],
  templateUrl: './error-snackbar.component.html',
  styleUrl: './error-snackbar.component.scss'
})
export class ErrorSnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  snackBarRef = inject(MatSnackBarRef);
}
