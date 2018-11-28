import { Component, OnInit } from '@angular/core';
import {AppSettingsService} from '../../../services/AppSettings/appsettings.service';

@Component({
  selector: 'app-setup-edit',
  templateUrl: './setup-edit.component.html',
  styleUrls: ['./setup-edit.component.css']
})
export class SetupEditComponent implements OnInit {

  title: string;
  appState: number;

  constructor(private appSettingsService: AppSettingsService) { }

  ngOnInit() {
    this.appSettingsService.initAllSettings();
    this.title = this.appSettingsService.appTitle;
    this.appState = this.appSettingsService.appState;
  }

  setTitle(title: string) {
    this.appSettingsService.setTitle(title);
  }

  setAppState(appState: number) {
    this.appSettingsService.setAppState(appState);
  }
}
