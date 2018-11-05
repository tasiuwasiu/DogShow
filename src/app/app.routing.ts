import { Routes, RouterModule } from '@angular/router';
import {InformationScheduleComponent} from './components/information/information-schedule/information-schedule.component';
import {LoginComponent} from './components/login/login/login.component';
import {SetupInitComponent} from './components/setup/setup-init/setup-init.component';
import {AuthGuardService} from './services/AuthGuard/auth-guard.service';


const routes: Routes = [
  { path: '', component: InformationScheduleComponent},
  { path: 'login', component: LoginComponent },
  { path: 'setup/init', component: SetupInitComponent, canActivate: [AuthGuardService], data: {auth: '2'}},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRouter = RouterModule.forRoot(routes);
