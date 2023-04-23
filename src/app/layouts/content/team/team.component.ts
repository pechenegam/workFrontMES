import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Team} from "../../../models/team";
import {TeamService} from "../../../services/team-service";
import {TeamCriteria} from "../../../models/team-criteria";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TeamTableModel} from "./models/team-table-model";
import {MatDialog} from "@angular/material/dialog";
import {EditTeamComponent} from "./edit-team/edit-team.component";
import {AuthService} from "../../../services/auth.service";
import {UserRole} from "../../../models/user-role";


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly displayedColumns = ['id', 'unitName', 'unitHead'];
  readonly dataSource = new MatTableDataSource<TeamTableModel>();
  teams: Team[];
  // filterValue: string;
  teamCriteria = new TeamCriteria();
  formGroupFilter: FormGroup;
  isAdmin = false;
  constructor(private teamService: TeamService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setIfUserisAcmin();
    this.formGroupFilter = this.formBuilder.group({
      unitName: [''],
      headFirstName: [''],
      headSecondName: ['']
    });
    console.log('1');
    this.dataSource.paginator = this.paginator;
    this.teamService.fetchAllTeam(new TeamCriteria()).subscribe(res => {
      this.teams = res;
      this.initDataSource();
    });

  }

  private setIfUserisAcmin() {
    this.isAdmin = this.authService.hasRole(UserRole.ADMIN);
    if (this.isAdmin) {
      this.displayedColumns.push('edit');
      this.displayedColumns.push('delete');
    }
  }

  get filterControls() {
    return this.formGroupFilter.controls;
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

  updateFilter() {
    this.reloadData();
  }

  private reloadData() {
    this.setFilterValues();
    this.teamService.fetchAllTeam(this.teamCriteria).subscribe(res => {
      console.log(res);
      this.teams = res;
      this.initDataSource();
    });
  }

  private setFilterValues() {
    this.teamCriteria.unitName = this.filterControls['unitName'].value;
    this.teamCriteria.headFirstName = this.filterControls['headFirstName'].value;
    this.teamCriteria.headSecondName = this.filterControls['headSecondName'].value;
  }

  delete(id: string) {
    this.teamService.delete(id).subscribe(res => {
      this.reloadData();
    });
  }

  edit(team: Team) {
    let headId = this.teams.find(team1 => team1.id == team.id).unitHead.id;
    const dialog = this.dialog.open(EditTeamComponent, {
      panelClass: 'app-dialog',
      maxWidth: '500px',
      width: '500px',

      data: {
        id: team.id,
        headId: headId,
        unitName: team.unitName,
      },
      disableClose: false,
    });

    dialog.beforeClosed()
      .subscribe(() => {
        this.reloadData();
      })

  }

  // this.teamService.edit(team).subscribe(res => {
  //   this.reloadData();
  // });


  clearFilter() {
    this.clearFilterFields();
    this.reloadData();
  }

  private clearFilterFields() {
    this.formGroupFilter.reset();
    // this.teamCriteria.unitName = '';
  }

  addNew() {
    const dialog = this.dialog.open(EditTeamComponent, {
      panelClass: 'app-dialog',
      maxWidth: '500px',
      width: '500px',
      disableClose: false,
    });

    dialog.beforeClosed()
      .subscribe(() => {
        this.reloadData();
      })
  }
}
