import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthorizationService} from '../Authorization/authorization.service';
import { PermissionLevel} from '../../helpers/PermissionLevel.types';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(protected router: Router, protected authorizationService: AuthorizationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.hasRequiredPermission(route.data['auth']);
  }

  protected hasRequiredPermission(permissionLevel: PermissionLevel): boolean {
    if (permissionLevel === '0') {
      return true;
    } else {
      return this.authorizationService.hasPermission(permissionLevel);
    }
  }
}
