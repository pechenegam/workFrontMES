import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Urls } from 'src/app/utils/urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  login(): void {
    this.authService.login(this.form.value.login, this.form.value.password)
      .subscribe(() => this.navigateToMain(), () => this.alertWongCredentials());
  }

  private alertWongCredentials() {
    return this.snackBar.open('Wrong credentials!', '', {duration: 1000});
  }

  private navigateToMain() {
    return this.router.navigate([Urls.HELLO_PAGE]);
  }
}
