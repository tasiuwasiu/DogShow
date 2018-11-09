import {Routes, RouterModule} from '@angular/router';
import {InformationScheduleComponent} from './components/information/information-schedule/information-schedule.component';
import {LoginComponent} from './components/login/login/login.component';
import {AuthGuardService} from './services/AuthGuard/auth-guard.service';
import {ProfileCreateComponent} from './components/profile/profile-create/profile-create.component';
import {ProfileDetailsComponent} from './components/profile/profile-details/profile-details.component';
import {ProfileEditComponent} from './components/profile/profile-edit/profile-edit.component';
import {DogCreateComponent} from './components/dog/dog-create/dog-create.component';
import {DogListComponent} from './components/dog/dog-list/dog-list.component';
import {PlaceCreateComponent} from './components/place/place-create/place-create.component';
import {PlaceListComponent} from './components/place/place-list/place-list.component';
import {PlaceEditComponent} from './components/place/place-edit/place-edit.component';
import {InformationWinnersComponent} from './components/information/information-winners/information-winners.component';
import {SetupEditComponent} from './components/setup/setup-edit/setup-edit.component';


const routes: Routes = [
  {path: '', component: InformationScheduleComponent},
  // information
  {path: 'schedule', component: InformationScheduleComponent},
  {path: 'results', component: InformationWinnersComponent},
  // profile
  {path: 'profile', component: ProfileDetailsComponent, canActivate: [AuthGuardService], data: {auth: '4'}},
  {path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuardService], data: {auth: '4'}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: ProfileCreateComponent},
  // setup
  {path: 'settings', component: SetupEditComponent, canActivate: [AuthGuardService], data: {auth: '2'}},
  // dog
  {path: 'dog/add', component: DogCreateComponent, canActivate: [AuthGuardService], data: {auth: '4'}},
  {path: 'dog/list', component: DogListComponent, canActivate: [AuthGuardService], data: {auth: '4'}},
  // place
  {path: 'place', component: PlaceListComponent, canActivate: [AuthGuardService], data: {auth: '2'}},
  {path: 'place/:id', component: PlaceEditComponent, canActivate: [AuthGuardService], data: {auth: '2'}},
  {path: 'place/create', component: PlaceCreateComponent, canActivate: [AuthGuardService], data: {auth: '2'}},
  // contest


  // default
  {path: '**', redirectTo: ''}
];

export const AppRouter = RouterModule.forRoot(routes);
