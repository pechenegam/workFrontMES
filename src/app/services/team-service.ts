import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../models/team";
import {TeamCriteria} from "../models/team-criteria";
import {TeamRequest} from "../layouts/content/team/models/team-request";

const PATH = '/api/v1/teams';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {
  }

  fetchAllTeam(teamCriteria: TeamCriteria): Observable<Team[]> {
    return this.http.put<Team[]>(`${PATH}`, teamCriteria);
  }

  // fetchAllUsersConversions(): Observable<Conversion[]> {
  //   return this.http.get<Conversion[]>(`${PATH}/all`);
  // }
  //
  // convert(sum: number, from: ExchangeRate, to: ExchangeRate): Observable<Conversion> {
  //   return this.http.post<Conversion>(PATH, {fromValue: sum, currencyFrom: from.currency, currencyTo: to.currency});
  // }
  delete(id: string) {
    return this.http.put<Team>(`${PATH}/${id}`, {});
  }

  edit(team: TeamRequest) {
    return this.http.put<Team>(`${PATH}/update`, team);
  }

  save(team: TeamRequest) {
    return this.http.post<Team>(`${PATH}/save`, team);
  }
}
