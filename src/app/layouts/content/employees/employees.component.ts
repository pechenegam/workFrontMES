import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Team} from "../../../models/team";
import {UserCriteria} from "../../../models/user-criteria";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user-service";
import {UserTableModel} from "./models/user-table-model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EditTeamComponent} from "../team/edit-team/edit-team.component";
import {EditEmployeesComponent} from "./edit-employees/edit-employees.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly displayedColumns = ['id', 'username', 'firstName', 'secondName', 'email', 'createdDate', 'teamName', 'edit', 'delete'];
  readonly dataSource = new MatTableDataSource<UserTableModel>();
  users: User[];
  // filterValue: string;
  userCriteria = new UserCriteria();
  formGroupFilter: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.userService.fetchAllUser(new UserCriteria()).subscribe(res => {
      this.users = res;
      // this.users.forEach(user=>{
      //   user.createdDate = user.createdDate.format('YYYY-MM-DD');
      // });
      this.initDataSource();
      console.log(this.users);
    });
    this.formGroupFilter = this.formBuilder.group({
      unitName: [''],
      username: [''],
      firstName: [''],
      secondName: [''],
      email: [''],
    });

  }

  private initDataSource(): void {
    this.dataSource.data = this.generateDataSource(this.users);
    this.dataSource.sort = this.sort;
  }

  private generateDataSource(users: User[]): UserTableModel[] {
    return users.map(user => ({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      createdDate: user.createdDate,
      unitName: user.unitName,
      // unitHead: user.unitHead,
    } as UserTableModel));
  }

  updateFilter() {

    this.reloadData();
  }

  private setFilterValues() {
    this.userCriteria.username = this.filterControls['username'].value;
    this.userCriteria.firstName = this.filterControls['firstName'].value;
    this.userCriteria.secondName = this.filterControls['secondName'].value;
    this.userCriteria.email = this.filterControls['email'].value;
    this.userCriteria.unitName = this.filterControls['unitName'].value;
  }

  private reloadData() {
    this.setFilterValues();
    this.userService.fetchAllUser(this.userCriteria).subscribe(res => {
      console.log(res);
      this.users = res;
      this.initDataSource();
    });
  }

  delete(id: string) {
    this.userService.delete(id).subscribe(res => {
      this.reloadData();
    });
  }



  clearFilter() {
    console.log('clear');
    this.clearFilterFields();
    this.reloadData();
  }

  private clearFilterFields() {
    this.formGroupFilter.reset();
  }

  get filterControls() {
    return this.formGroupFilter.controls;
  }

  // edit(user: User) {
  //   this.userService.edit(user).subscribe(res => {
  //     this.reloadData();
  //   });
  // }

  edit(userId: string) {
    const putUser = this.users.find(user=> user.id == userId);
    const dialog = this.dialog.open(EditEmployeesComponent, {
      panelClass: 'app-dialog',
      maxWidth: '500px',
      width: '500px',

      data: {
        user: putUser,
      },
      disableClose: false,
    });

    dialog.beforeClosed()
      .subscribe(() => {
        this.reloadData();
      })

  }
}
