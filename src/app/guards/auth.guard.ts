import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {UserRole} from "../models/user-role";
import {Urls} from "../utils/urls";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = route.data['roles'] as Array<UserRole>;
    const hasRoles = this.authService.hasRoles(roles);
    if (hasRoles) {
      return true;
    }
    this.snackBar.open(`Roles required: ${roles.join(', ')}`, '', {duration: 1000});
    return this.router.navigate([Urls.LOGIN]);
  }
}
