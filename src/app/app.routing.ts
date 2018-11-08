import {Routes, RouterModule} from '@angular/router';
import {InformationScheduleComponent} from './components/information/information-schedule/information-schedule.component';
import {LoginComponent} from './components/login/login/login.component';
import {SetupInitComponent} from './components/setup/setup-init/setup-init.component';
import {AuthGuardService} from './services/AuthGuard/auth-guard.service';
import {ProfileCreateComponent} from './components/profile/profile-create/profile-create.component';
import {ProfileDetailsComponent} from './components/profile/profile-details/profile-details.component';
import {ProfileEditComponent} from './components/profile/profile-edit/profile-edit.component';
import {DogCreateComponent} from './components/dog/dog-create/dog-create.component';
import {DogListComponent} from './components/dog/dog-list/dog-list.component';
import {PlaceCreateComponent} from './components/place/place-create/place-create.component';


const routes: Routes = [
  {path: '', component: InformationScheduleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'setup/init', component: SetupInitComponent, canActivate: [AuthGuardService], data: {auth: '2'}},
  {path: 'register', component: ProfileCreateComponent},
  {path: 'profile', component: ProfileDetailsComponent, canActivate: [AuthGuardService], data: {auth: '4'}},
  {path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuardService], data: {auth: '4'}},
  {path: 'dog/add', component: DogCreateComponent, canActivate: [AuthGuardService], data: {auth: '4'}},
  {path: 'dog/list', component: DogListComponent, canActivate: [AuthGuardService], data: {auth: '4'}},
  {path: 'place/create', component: PlaceCreateComponent, canActivate: [AuthGuardService], data: {auth: '2'}},
  {path: '**', redirectTo: ''}
];

export const AppRouter = RouterModule.forRoot(routes);
