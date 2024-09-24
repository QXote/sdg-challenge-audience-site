import {inject, Injectable} from '@angular/core';
import {from, map, Observable, take} from "rxjs";
import {Database, equalTo, get, orderByChild, ref, query, child} from "@angular/fire/database";
import {Auth, signInWithPopup, browserLocalPersistence, onAuthStateChanged} from "@angular/fire/auth";
import {SuccessSnackbarComponent} from "../components/success-snackbar/success-snackbar.component";
import {ErrorSnackbarComponent} from "../components/error-snackbar/error-snackbar.component";
import {GoogleAuthProvider, User} from "firebase/auth";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _db = inject(Database);
  private _auth = inject(Auth);
  private _snackBar = inject(MatSnackBar);
  private user: User | null;
  private isAdmin: boolean;

  constructor() {
    this._auth.setPersistence(browserLocalPersistence)
      .then(() => {
        this.listenToAuthState();
      });
  }

  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    let result = await signInWithPopup(this._auth, provider);

    this.user = result.user;

    if (this.user) {
      await this.checkAdminRole(this.user.email!);
    }

    if (this.isAdmin) {
      return true;
    }
    else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!this._auth.currentUser;
  }

  private listenToAuthState() {
    onAuthStateChanged(this._auth, (user) => {
      this.user = user;
      if (user) {
        console.log('User is logged in:', user.email);
      } else {
        console.log('User is logged out');
      }
    });
  }

   private async checkAdminRole(email: string) {
     try {
       const encodedEmail = btoa(email);
       const dbRef = ref(this._db);

       const snapshot = await get(child(dbRef, `adminUsers`));

       if (snapshot.exists()) {
         const adminUsersArray = snapshot.val();

         if (adminUsersArray.includes(encodedEmail)) {
           this.isAdmin = true;
           this._snackBar.openFromComponent(SuccessSnackbarComponent, {
             data: "Login successful!",
             panelClass: ['success-snackbar'],
             duration: 3000
           });
         } else {
            this.isAdmin = false;
            this._snackBar.openFromComponent(ErrorSnackbarComponent, {
              data: "No admin role found for this user!",
              panelClass: ['error-snackbar'],
              duration: 3000
            });
            await this._auth.signOut();
            this.user = null;
         }
       } else {
         this.isAdmin = false;
         this._snackBar.openFromComponent(ErrorSnackbarComponent, {
           data: "No admin roles found!",
           panelClass: ['error-snackbar'],
           duration: 3000
         });
         await this._auth.signOut();
         this.user = null;
       }
     } catch (error) {
       console.error(error);
       this._snackBar.openFromComponent(ErrorSnackbarComponent, {
         data: `An error occurred! ${error.message}`,
         panelClass: ['error-snackbar'],
         duration: 3000
       });
     }
   }

  /**
   * Verify if the access code is valid
   * @returns Observable<string | null> - The key of the session if the access code is valid, otherwise null
   */
  accessCodeIsValid(accessCode: string): Observable<string | null> {
    const sessionsRef = ref(this._db, 'sessions');
    const sessionsQuery = query(sessionsRef, orderByChild('accessCode'), equalTo(accessCode));

    return from(get(sessionsQuery)).pipe(
      take(1),
      map(snapshot => {
        if (snapshot.exists()) {
          const sessions = snapshot.val();
          // Extract the key of the first matched session
          const sessionKey = Object.keys(sessions)[0];
          return sessionKey;
        } else {
          return null;
        }
      })
    );
  }
}
