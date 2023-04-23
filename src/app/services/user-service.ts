import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../models/team";
import {TeamCriteria} from "../models/team-criteria";
import {UserCriteria} from "../models/user-criteria";
import {User} from "../models/user";

const PATH = '/api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  fetchAllUser(userCriteria: UserCriteria): Observable<User[]> {
    return this.http.put<User[]>(`${PATH}`, userCriteria);
  }

  // fetchAllUsersConversions(): Observable<Conversion[]> {
  //   return this.http.get<Conversion[]>(`${PATH}/all`);
  // }
  //
  // convert(sum: number, from: ExchangeRate, to: ExchangeRate): Observable<Conversion> {
  //   return this.http.post<Conversion>(PATH, {fromValue: sum, currencyFrom: from.currency, currencyTo: to.currency});
  // }
  delete(id: string) {
    return this.http.put<User[]>(`${PATH}/${id}`, {});
  }

  edit(user: User) {
    return this.http.put<Team[]>(`${PATH}/update`, user);
  }
}
