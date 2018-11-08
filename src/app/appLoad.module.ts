import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {AppSettingsService} from './services/AppSettings/appsettings.service';


export function init_app(appSettingsService: AppSettingsService) {
  return () => appSettingsService.initAllSettings();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AppSettingsService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppSettingsService], multi: true }
  ]
})
export class AppLoadModule { }
