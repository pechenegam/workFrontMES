import {Injectable} from '@angular/core';
import {Jwt} from "../models/jwt";

const AUTH = 'auth';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  save(auth: Jwt): void {
    sessionStorage.setItem(AUTH, JSON.stringify(auth));
  }

  load(): Jwt {
    return JSON.parse(sessionStorage.getItem(AUTH)) as Jwt;
  }

  clear(): void {
    sessionStorage.removeItem(AUTH);
  }
}
