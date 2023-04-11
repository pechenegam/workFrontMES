import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TeamService} from "../services/team-service";
import {Team} from "../models/team";
import {TeamCriteria} from "../models/team-criteria";

@Injectable({
  providedIn: 'root'
})
export class AllTeamResolver implements Resolve<Team[]> {
  constructor(private service: TeamService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team[]> {
    return this.service.fetchAllTeam(new TeamCriteria());
  }
}
