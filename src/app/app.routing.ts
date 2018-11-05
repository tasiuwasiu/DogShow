import { Routes, RouterModule } from '@angular/router';
import {InformationScheduleComponent} from './components/information/information-schedule/information-schedule.component';
import {LoginComponent} from './components/login/login/login.component';


const routes: Routes = [
  { path: '', component: InformationScheduleComponent},
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRouter = RouterModule.forRoot(routes);
