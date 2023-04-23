import {Component} from '@angular/core';
import {Urls} from 'src/app/utils/urls';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserRole} from "../../models/user-role";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  readonly Urls = Urls;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.authService.hasRole(UserRole.ADMIN);
  }

  login(): void {
    this.router.navigate([Urls.LOGIN]);
  }

  registration(): void {
    this.router.navigate([Urls.REG]);
  }

  logout(): void {
    this.authService.logout();
  }
}
