import {inject, Injectable} from '@angular/core';
import {Database, get, limitToLast, onValue, orderByKey, query, ref, set, update} from "@angular/fire/database";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  _db = inject(Database);

  public registrationsCount$ = new BehaviorSubject<number>(0);
  public votesCount$ = new BehaviorSubject<number>(0);

  listenToSessionData(currentSessionKey): void {
    const registrationsRef = ref(this._db, `sessions/${currentSessionKey}/registration`);
    const votesRef = ref(this._db, `sessions/${currentSessionKey}/votes`);

    onValue(registrationsRef, (snapshot) => {
      const registrationsCount = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
      this.registrationsCount$.next(registrationsCount);
    });

    onValue(votesRef, (snapshot) => {
      const votesCount = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
      this.votesCount$.next(votesCount);
    });
  }

  async updateSession(startVoting: boolean) {
    try {
      const sessionsRef = ref(this._db, 'sessions');

      const recentSessionQuery = query(sessionsRef, orderByKey(), limitToLast(1));
      const snapshot = await get(recentSessionQuery);

      if (snapshot.exists()) {
        const recentSessionKey = Object.keys(snapshot.val())[0];
        const recentSessionPath = `sessions/${recentSessionKey}`;

        await update(ref(this._db, recentSessionPath), { started: startVoting });
      } else {
        console.log('No existing sessions found.');
      }
    } catch (error) {
      console.error('Error starting session:', error);
    }
  }

  async endSession() {
    try {
      const sessionsRef = ref(this._db, 'sessions');

      const recentSessionQuery = query(sessionsRef, orderByKey(), limitToLast(1));
      const snapshot = await get(recentSessionQuery);

      if (snapshot.exists()) {
        const recentSessionKey = Object.keys(snapshot.val())[0];
        const recentSessionPath = `sessions/${recentSessionKey}`;

        await update(ref(this._db, recentSessionPath), { started: false });

        const nextSessionKey = Number(recentSessionKey.split('session')[1]) + 1;
        const newSessionPath = `sessions/session${nextSessionKey}`;

        await set(ref(this._db, newSessionPath), { started: false });
      } else {
        console.log('No existing sessions found to end.');
      }
    } catch (error) {
      console.error('Error ending session:', error);
    }
  }

  async checkSession(): Promise<{ sessionKey: string | null; started: boolean }> {
    try {
      const sessionsRef = ref(this._db, 'sessions');

      const recentSessionQuery = query(sessionsRef, orderByKey(), limitToLast(1));
      const snapshot = await get(recentSessionQuery);

      if (snapshot.exists()) {
        const recentSessionKey = Object.keys(snapshot.val())[0];
        const recentSessionData = snapshot.val()[recentSessionKey];

        return { sessionKey: recentSessionKey, started: recentSessionData.started === true };
      } else {
        console.log('No existing sessions found.');
        return { sessionKey: null, started: false };
      }
    } catch (error) {
      console.error('Error checking session:', error);
      return { sessionKey: null, started: false };
    }
  }
}
