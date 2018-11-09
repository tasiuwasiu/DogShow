import {Injectable} from '@angular/core';
import {PermissionLevel} from '../../helpers/PermissionLevel.types';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../models/User.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private loginChangedSource = new Subject<boolean>();
  loginChanged$ = this.loginChangedSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(`${environment.apiUrl}user/login`, {'Email': email, 'Password': password})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loginChangedSource.next(true);
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loginChangedSource.next(false);
  }

  hasPermission(permissionLevel: PermissionLevel): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token && currentUser.permissionLevel) {
      if (!this.hasTokenExpired(currentUser.token)) {
        return parseInt(currentUser.permissionLevel, 10) <= parseInt(permissionLevel, 10);
      }
      return false;
    } else {
      return false;
    }
  }

  getCurrentUserID() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id) {
      return currentUser.id;
    } else {
      return -1;
    }
  }

  getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return <User>currentUser;
  }

  hasTokenExpired(token: string) {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }
}
