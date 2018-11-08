import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from '../Message/message.service';
import {AppStates} from '../../helpers/AppStates.enum';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  appTitle = 'DogShow';
  appState = AppStates.canEnter;

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) {
  }

  initAllSettings() {
    this.appTitle = 'Mój tytuł';
  }

  setAppState(stateCode: number) {
    if (Object.values(AppStates).includes(stateCode)) {
      this.httpClient.post(`${environment.apiUrl}appSettings/appState`, stateCode).subscribe(
        data => {
          this.messageService.addSuccess('Zmieniono tryb aplikacji!');
          this.appState = stateCode;
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
  }

  setTitle(title: string) {
    this.appTitle = title;
    this.httpClient.post(`${environment.apiUrl}appSettings/title`, title)
      .subscribe(
        data => {
          this.messageService.addSuccess('Zapisano tytuł!');
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
}
