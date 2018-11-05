import {Component} from '@angular/core';
import {AuthorizationService} from '../services/Authorization/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DogShow';

  constructor(private authorizationService: AuthorizationService) {
  }

  isLogged() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return !!currentUser;
  }

  isAdmin() {
    return this.authorizationService.hasPermission('1');
  }

  isOrganizator() {
    return this.authorizationService.hasPermission('2');
  }

  isJudge() {
    return this.authorizationService.hasPermission('3');
  }

  isUser() {
    return this.authorizationService.hasPermission('4');
  }

}
