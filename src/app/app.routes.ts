import { Routes } from '@angular/router';
import {LandingPageComponent} from "./features/landing-page/landing-page.component";
import {RegistrationComponent} from "./features/registration/registration.component";
import {VotingComponent} from "./features/voting/voting.component";
import {InformationComponent} from "./features/information/information.component";
import {AdminComponent} from "./features/admin/admin.component";
import {ManageSessionComponent} from "./features/admin/manage-session/manage-session.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    data: { showInTabs: false, showHeader: false }
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: { showInTabs: false, showHeader: false},
  },
  {
    path: 'admin/manage-session',
    component: ManageSessionComponent,
    data: { showInTabs: false, showHeader: false }
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: { showInTabs: true, label: 'Register', icon: 'person_edit', showHeader: true }
  },
  {
    path: 'information',
    component: InformationComponent,
    data: { showInTabs: true, label: 'Info', icon: 'info', showHeader: true }
  },
  {
    path: 'voting',
    component: VotingComponent,
    data: { showInTabs: true, label: 'Voting', icon: 'how_to_vote', showHeader: true }
  }
];
