import {Injectable} from '@angular/core';
import {Jwt} from "../models/jwt";

const AUTH = 'auth';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  save(auth: Jwt): void {
    localStorage.setItem(AUTH, JSON.stringify(auth));
  }

  load(): Jwt {
    return JSON.parse(localStorage.getItem(AUTH)) as Jwt;
  }

  clear(): void {
    localStorage.removeItem(AUTH);
  }
}
