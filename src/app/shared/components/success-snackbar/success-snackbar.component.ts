import {Component, inject, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-success-snackbar',
  standalone: true,
    imports: [
        MatButton,
        MatSnackBarAction,
        MatSnackBarActions,
        MatSnackBarLabel
    ],
  templateUrl: './success-snackbar.component.html',
  styleUrl: './success-snackbar.component.scss'
})
export class SuccessSnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  snackBarRef = inject(MatSnackBarRef);
}
