import {Injectable} from '@angular/core';
import {PermissionLevel} from '../../helpers/PermissionLevel.types';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() {
  }

  static hasPermission(permissionLevel: PermissionLevel) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.permissionLevel) {
      return parseInt(currentUser.permissionLevel, 10) <= parseInt(permissionLevel, 10);
    } else {
      return false;
    }
  }
}
