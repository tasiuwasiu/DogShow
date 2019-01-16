import { Component, OnInit } from '@angular/core';
import {AppSettingsService} from '../../../services/AppSettings/appsettings.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-setup-edit',
  templateUrl: './setup-edit.component.html',
  styleUrls: ['./setup-edit.component.css']
})
export class SetupEditComponent implements OnInit {

  title: string;
  appState: number;

  constructor(private titleService: Title,
              private appSettingsService: AppSettingsService) { }

  ngOnInit() {
    this.titleService.setTitle('Edycja ustawień');
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
