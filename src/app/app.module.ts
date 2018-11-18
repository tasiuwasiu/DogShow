import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {AppComponent} from './components/app.component';
import {SetupEditComponent} from './components/setup/setup-edit/setup-edit.component';
import {ProfileCreateComponent} from './components/profile/profile-create/profile-create.component';
import {ProfileDetailsComponent} from './components/profile/profile-details/profile-details.component';
import {ProfileEditComponent} from './components/profile/profile-edit/profile-edit.component';
import {ContestTypeCreateComponent} from './components/contest-type/contest-type-create/contest-type-create.component';
import {DogCreateComponent} from './components/dog/dog-create/dog-create.component';
import {DogEditComponent} from './components/dog/dog-edit/dog-edit.component';
import {DogDetailsComponent} from './components/dog/dog-details/dog-details.component';
import {DogListComponent} from './components/dog/dog-list/dog-list.component';
import {ContestCreateComponent} from './components/contest/contest-create/contest-create.component';
import {ContestDisplayComponent} from './components/contest/contest-display/contest-display.component';
import {ContestEditComponent} from './components/contest/contest-edit/contest-edit.component';
import {ContestListComponent} from './components/contest/contest-list/contest-list.component';
import {ContestParticipationComponent} from './components/contest/contest-participation/contest-participation.component';
import {ContestGradeComponent} from './components/contest/contest-grade/contest-grade.component';
import {PlaceCreateComponent} from './components/place/place-create/place-create.component';
import {PlaceEditComponent} from './components/place/place-edit/place-edit.component';
import {PlaceListComponent} from './components/place/place-list/place-list.component';
import {InformationWinnersComponent} from './components/information/information-winners/information-winners.component';
import {InformationScheduleComponent} from './components/information/information-schedule/information-schedule.component';
import {LoginComponent} from './components/login/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './helpers/token.interceptor';
import {MessageComponent} from './components/message/message.component';
import {AppRouter} from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppLoadModule} from './app-load.module';
import { MenuComponent } from './components/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {Ng2CompleterModule} from 'ng2-completer';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  declarations: [
    AppComponent,
    SetupEditComponent,
    ProfileCreateComponent,
    ProfileDetailsComponent,
    ProfileEditComponent,
    ContestTypeCreateComponent,
    DogCreateComponent,
    DogEditComponent,
    DogDetailsComponent,
    DogListComponent,
    ContestCreateComponent,
    ContestDisplayComponent,
    ContestEditComponent,
    ContestListComponent,
    ContestParticipationComponent,
    ContestGradeComponent,
    PlaceCreateComponent,
    PlaceEditComponent,
    PlaceListComponent,
    InformationWinnersComponent,
    InformationScheduleComponent,
    LoginComponent,
    MessageComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppLoadModule,
    NgMultiSelectDropDownModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
  ],
  providers: [
    Title,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'pl'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
