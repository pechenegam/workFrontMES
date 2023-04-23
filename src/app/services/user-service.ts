import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../models/team";
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

  delete(id: string) {
    return this.http.put<User[]>(`${PATH}/${id}`, {});
  }

  edit(user: User) {
    return this.http.put<Team[]>(`${PATH}/update`, user);
  }
}
