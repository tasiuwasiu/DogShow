import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/Authorization/authorization.service';
import {AppSettingsService} from '../../services/AppSettings/appsettings.service';
import {AppStates} from '../../helpers/AppStates.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  title = '';
  appState: AppStates = AppStates.canEnter;
  isLogged = false;
  isJudge = false;
  isOrganizator = false;

  constructor(private authorizationService: AuthorizationService,
              private appSettingsService: AppSettingsService) {
    authorizationService.loginChanged$.subscribe(
      data => {
        this.refreshLoginData();
      }
    );
    this.appSettingsService.settingChanged$.subscribe(
      data => {
        this.refreshSettings();
      }
    );
  }

  ngOnInit() {
    this.refreshLoginData();
    this.refreshSettings();
  }

  refreshLoginData() {
    this.isLogged = this.authorizationService.hasPermission('5');
    this.isJudge = this.authorizationService.hasPermission('3');
    this.isOrganizator = this.authorizationService.hasPermission('2');
  }

  refreshSettings() {
    this.title = this.appSettingsService.appTitle;
    this.appState = this.appSettingsService.appState;
  }

}
