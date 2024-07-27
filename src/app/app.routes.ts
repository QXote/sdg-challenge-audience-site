import { Routes } from '@angular/router';
import {LandingPageComponent} from "./features/landing-page/landing-page.component";
import {RegistrationComponent} from "./features/registration/registration.component";
import {VotingComponent} from "./features/voting/voting.component";
import {InformationComponent} from "./features/information/information.component";


export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'voting',
    component: VotingComponent
  },
  {
    path: 'information',
    component: InformationComponent
  }
];
