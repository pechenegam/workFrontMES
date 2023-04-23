import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../services/user-service";
import {TeamService} from "../../../../services/team-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserTableModel} from "../models/user-table-model";
import {TeamCriteria} from "../../../../models/team-criteria";
import {Team} from "../../../../models/team";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html',
  styleUrls: ['./edit-employees.component.scss']
})
export class EditEmployeesComponent implements OnInit {

  teams: Team[];
  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditEmployeesComponent>,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private teamService: TeamService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      firstName: [this.data.user.firstName, Validators.required],
      secondName: [this.data.user.secondName, Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      teamId: [this.data.user.teamId, Validators.required]
    });

    this.teamService.fetchAllTeam(new TeamCriteria()).subscribe(res => {
      this.teams = res;
    });
  }

  get formControls() {
    return this.formGroup.controls;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    let saveUser = this.generateRequest();
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.snackBar.open('Проверьте форму', '', {
        verticalPosition: 'top',
        panelClass: 'snack-bar-error',
        duration: 3000
      });
      return;
    }
    if (this.data) {
      this.userService.edit(saveUser).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  private generateRequest() {
    let saveUser = new User();
    saveUser.id = this.data?.user.id;
    saveUser.firstName = this.formControls['firstName'].value;
    saveUser.secondName = this.formControls['secondName'].value;
    saveUser.email = this.formControls['email'].value;
    saveUser.teamId = this.formControls['teamId'].value;
    return saveUser;
  }
}
