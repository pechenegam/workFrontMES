import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Jwt} from "../models/jwt";
import {RefreshToken} from "../models/refresh-token";
import {AuthStorageService} from "./auth-storage.service";
import {Router} from "@angular/router";
import {Urls} from "../utils/urls";
import {UserRole} from "../models/user-role";

const PATH = '/api/v1/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private authStorage: AuthStorageService,
              private router: Router) {
  }

  login(username: string, password: string): Observable<Jwt> {
    return this.httpClient.post<Jwt>(`${PATH}/sign-in`, {username, password})
      .pipe(tap(jwt => this.authStorage.save(jwt)));
  }

  logout(): void {
    this.authStorage.clear();
    this.router.navigate([Urls.LOGIN]);
  }

  refresh(): Observable<RefreshToken> {
    let auth = this.authStorage.load();
    return this.httpClient.post<RefreshToken>(`${PATH}/refresh`, {refreshToken: auth.refreshToken})
      .pipe(tap(token => this.updateRefreshToken(token)));
  }

  isLoggedIn(): boolean {
    return !!this.authStorage.load();
  }

  hasRoles(roles: UserRole[]): boolean {
    const auth = this.authStorage.load();
    return auth && roles.every(role => auth.roles.includes(role));
  }

  private updateRefreshToken(refreshToken: RefreshToken): void {
    const auth = this.authStorage.load();
    auth.token = refreshToken.accessToken;
    this.authStorage.save(auth);
  }
}
