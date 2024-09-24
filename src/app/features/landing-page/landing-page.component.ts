import {Component, inject, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AccessCodeDialogComponent} from "./access-code-dialog/access-code-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatOption,
    MatSelect,
    MatButton
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  dialog = inject(MatDialog);
  router = inject(Router);

  ngOnInit(): void {
    // this.openAccessCodeDialog();
  }

  navigateToRegistration(): void {
    this.router.navigate(['registration']);
  }

  private openAccessCodeDialog() {
    const dialogRef = this.dialog.open(AccessCodeDialogComponent, {
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
