import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../Authorization/authorization.service';
import {PermissionLevel} from '../../helpers/PermissionLevel.types';
import {MessageService} from '../Message/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(protected router: Router,
              protected authorizationService: AuthorizationService,
              protected messageService: MessageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.hasRequiredPermission(route.data['auth'])) {
      return true;
    } else {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
        .then(() => {
          this.messageService.addWarning('Musisz się zalogować!');
        });
      return false;
    }
  }

  protected hasRequiredPermission(permissionLevel: PermissionLevel): boolean {
    if (permissionLevel === '5') {
      return true;
    } else {
      return this.authorizationService.hasPermission(permissionLevel);
    }
  }
}
