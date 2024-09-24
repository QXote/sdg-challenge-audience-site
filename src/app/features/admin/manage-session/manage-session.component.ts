import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {SessionService} from "../../../shared/services/session.service";
import {MatDivider} from "@angular/material/divider";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {EndSessionDialogComponent} from "./end-session-dialog/end-session-dialog.component";

@Component({
  selector: 'app-manage-session',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatDivider,
    MatProgressSpinner,
    AsyncPipe
  ],
  templateUrl: './manage-session.component.html',
  styleUrl: './manage-session.component.scss'
})
export class ManageSessionComponent implements OnInit {

  _dialog = inject(MatDialog);
  _sessionService = inject(SessionService);
  sessionStarted: boolean = false;
  sessionKey: string;

  loading: boolean = true;

  public registrationsCount$ = this._sessionService.registrationsCount$; // Expose as observable
  public votesCount$ = this._sessionService.votesCount$;

  ngOnInit(): void {
    this._sessionService.checkSession().then(({ sessionKey, started }) => {
      this.sessionStarted = started;
      this.sessionKey = sessionKey;
      this._sessionService.listenToSessionData(sessionKey)
    }).catch(error => {
      console.error('Error checking session:', error);
    }).finally(() => {
      this.loading = false;
    });
  }

  async startSession() {
    await this._sessionService.updateSession(true);
    this.sessionStarted = true;
  }

  async endSession() {
    await this._sessionService.updateSession(false);
    this.sessionStarted = false;
  }

  async newSessionDialog() {
    const dialogRef = this._dialog.open(EndSessionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._sessionService.endSession();
      }
    });
  }
}
