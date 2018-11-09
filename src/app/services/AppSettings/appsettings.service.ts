import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from '../Message/message.service';
import {AppStates} from '../../helpers/AppStates.enum';
import {TitleSetting} from '../../models/TitleSetting.model';
import {Subject} from 'rxjs';
import {AppSettings} from '../../models/AppSettings.model';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private settingsChangedSource = new Subject<boolean>();
  settingChanged$ = this.settingsChangedSource.asObservable();

  appTitle = '';
  appState = AppStates.canEnter;

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) {
  }

  initAllSettings() {
    this.getSettings();
  }

  setAppState(stateCode: number) {
    this.httpClient.post(`${environment.apiUrl}appSettings/appState`, {'appState': stateCode}).subscribe(
      data => {
        this.messageService.addSuccess('Zmieniono tryb aplikacji!');
        this.appState = stateCode;
        this.getSettings();
        this.settingsChangedSource.next(true);
      },
      error => {
        if (error.error && error.error.message) {
          this.messageService.addError(error.error.message);
        } else if (error.status !== null && error.status === 0) {
          this.messageService.addError('Brak połączenia z serwerem API!');
        } else {
          this.messageService.addError('Błąd zmiany trybu');
        }
      }
    );
  }

  setTitle(title: string) {
    this.httpClient.post(`${environment.apiUrl}appSettings/title`, {'title': title})
      .subscribe(
        data => {
          this.messageService.addSuccess('Zapisano tytuł!');
          this.appTitle = title;
          this.getSettings();
          this.settingsChangedSource.next(true);
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd zapisywania tytułu');
          }
        }
      );
  }

  getTitle() {
    this.httpClient.get<TitleSetting>(`${environment.apiUrl}appSettings/title`)
      .subscribe(
        data => {
          this.appTitle = data.title;
          this.settingsChangedSource.next(true);
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd pobierania tytułu');
          }
        }
      );
  }

  getAppState() {

  }

  getSettings() {
    this.httpClient.get<AppSettings>(`${environment.apiUrl}appSettings`)
      .subscribe(
        data => {
          this.appTitle = data.title;
          this.appState = data.appState;
          this.settingsChangedSource.next(true);
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd pobierania tytułu');
          }
        }
      );
  }
}
