import { Injectable } from '@angular/core';
import {from, map, Observable} from "rxjs";
import {Registration} from "../interfaces/registration";
import {Database, get, ref, set} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private _db: Database) { }

  checkEmailExists(email: string): Observable<boolean> {
    const encodedEmail = btoa(email);
    const emailRef = ref(this._db, `/registration/${encodedEmail}/email`);

    return from(get(emailRef)).pipe(
      map(snapshot => snapshot.exists())
    );
  }

  setRegistration(registration: Registration): Observable<void> {
    const encodedEmail = btoa(registration.email);
    const itemRef = ref(this._db, `registration/${encodedEmail}`);

    return from(set(itemRef, registration));
  }
}
