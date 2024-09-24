import {inject, Injectable} from '@angular/core';
import {from, map, Observable} from "rxjs";
import {Registration} from "../interfaces/registration";
import {Database, get, ref, set} from "@angular/fire/database";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _db = inject(Database);

  checkEmailExists(email: string, sessionKey: string): Observable<boolean> {
    const encodedEmail = btoa(email);
    const emailRef = ref(this._db, `sessions/${sessionKey}/registration/${encodedEmail}/email`);

    return from(get(emailRef)).pipe(
      map(snapshot => snapshot.exists())
    );
  }

  setRegistration(registration: Registration, sessionKey: string): Observable<void> {
    const encodedEmail = btoa(registration.email);
    const itemRef = ref(this._db, `sessions/${sessionKey}/registration/${encodedEmail}`);

    return from(set(itemRef, registration));
  }
}
