import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeamService} from "../../../../services/team-service";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user-service";
import {UserCriteria} from "../../../../models/user-criteria";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeamRequest} from "../models/team-request";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {

  users: User[];
  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditTeamComponent>,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private teamService: TeamService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    if (this.data) {
      this.formGroup = this.formBuilder.group({
        unitName: [this.data.unitName, Validators.required],
        headId: [this.data.headId, Validators.required],
      });
    } else {
      this.formGroup = this.formBuilder.group({
        unitName: ['', Validators.required],
        headId: ['', Validators.required],
      });
    }
    this.userService.fetchAllUser(new UserCriteria()).subscribe(res => {
      this.users = res;
    });
  }

  get formControls() {
    return this.formGroup.controls;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    let saveTeam = this.generateRequest();
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
      this.teamService.edit(saveTeam).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.teamService.save(saveTeam).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  private generateRequest() {
    let saveTeam = new TeamRequest();
    saveTeam.id = this.data?.id;
    saveTeam.unitName = this.formControls['unitName'].value;
    saveTeam.headId = this.formControls['headId'].value;
    return saveTeam;
  }
}
