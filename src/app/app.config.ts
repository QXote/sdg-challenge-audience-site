import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {connectDatabaseEmulator, getDatabase, provideDatabase} from '@angular/fire/database';
import {environment} from "../environments/environment";
import {connectAuthEmulator, getAuth, provideAuth} from '@angular/fire/auth';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {connectFunctionsEmulator, getFunctions, provideFunctions} from "@angular/fire/functions";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebaseConfig);

      if (environment.useEmulators) {
        const auth = getAuth(app);
        connectAuthEmulator(auth, 'http://localhost:9099');

        const db = getDatabase(app);
        connectDatabaseEmulator(db, 'localhost', 9000);

        const functions = getFunctions(app);
        connectFunctionsEmulator(functions, 'localhost', 5001);
      }

      return app;
    }),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
    importProvidersFrom(BrowserAnimationsModule)
  ]
};
