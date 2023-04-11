import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {TeamTableModel} from "./models/team-table-model";
import {Team} from "../../../models/team";
import {TeamService} from "../../../services/team-service";
import {TeamCriteria} from "../../../models/team-criteria";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly displayedColumns = ['id', 'unitName', 'unitHead', 'edit', 'delete'];
  readonly dataSource = new MatTableDataSource<TeamTableModel>();
  teams: Team[];
  filterValue: string;
  teamCriteria = new TeamCriteria();

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    console.log('1');
    this.dataSource.paginator = this.paginator;
    this.teamService.fetchAllTeam(new TeamCriteria()).subscribe(res => {
      this.teams = res;
      this.initDataSource();
    });

  }

  private initDataSource(): void {
    this.dataSource.data = this.generateDataSource(this.teams);
    this.dataSource.sort = this.sort;
  }

  private generateDataSource(teams: Team[]): TeamTableModel[] {
    return teams.map(team => ({
      id: team.id,
      unitName: team.unitName,
      unitHead: team.unitHead.firstName + ' ' + team.unitHead.secondName,
    } as TeamTableModel));
  }

  updateTable(filterValue: string = '') {

    this.teamCriteria.unitName = filterValue;
    this.reloadData();
  }

  private reloadData() {
    this.teamService.fetchAllTeam(this.teamCriteria).subscribe(res => {
      this.teams = res;
      this.initDataSource();
    });
  }

  delete(id: string) {
    this.teamService.delete(id).subscribe(res => {
      this.reloadData();
    });
  }

  edit(team: Team) {
    this.teamService.edit(team).subscribe(res => {
      this.reloadData();
    });
  }
}
