import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { AppRoutingModule } from './app-routing.module';
import { SetupInitComponent } from './components/setup/setup-init/setup-init.component';
import { SetupDetailsComponent } from './components/setup/setup-details/setup-details.component';
import { SetupEditComponent } from './components/setup/setup-edit/setup-edit.component';
import { SetupCloseComponent } from './components/setup/setup-close/setup-close.component';
import { ProfileCreateComponent } from './components/profile/profile-create/profile-create.component';
import { ProfileDetailsComponent } from './components/profile/profile-details/profile-details.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { ContestTypeCreateComponent } from './components/contest-type/contest-type-create/contest-type-create.component';
import { ContestTypeListComponent } from './components/contest-type/contest-type-list/contest-type-list.component';
import { DogCreateComponent } from './components/dog/dog-create/dog-create.component';
import { DogEditComponent } from './components/dog/dog-edit/dog-edit.component';
import { DogDetailsComponent } from './components/dog/dog-details/dog-details.component';
import { DogListComponent } from './components/dog/dog-list/dog-list.component';
import { ContestCreateComponent } from './components/contest/contest-create/contest-create.component';
import { ContestDisplayComponent } from './components/contest/contest-display/contest-display.component';
import { ContestEditComponent } from './components/contest/contest-edit/contest-edit.component';
import { ContestListComponent } from './components/contest/contest-list/contest-list.component';
import { ContestParticipationComponent } from './components/contest/contest-participation/contest-participation.component';
import { ContestGradeComponent } from './components/contest/contest-grade/contest-grade.component';
import { PlaceCreateComponent } from './components/place/place-create/place-create.component';
import { PlaceEditComponent } from './components/place/place-edit/place-edit.component';
import { PlaceListComponent } from './components/place/place-list/place-list.component';
import { InformationWinnersComponent } from './components/information/information-winners/information-winners.component';
import { InformationScheduleComponent } from './components/information/information-schedule/information-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupInitComponent,
    SetupDetailsComponent,
    SetupEditComponent,
    SetupCloseComponent,
    ProfileCreateComponent,
    ProfileDetailsComponent,
    ProfileEditComponent,
    ContestTypeCreateComponent,
    ContestTypeListComponent,
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
    InformationScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
