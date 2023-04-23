import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Urls} from "../../../utils/urls";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  form = this.formBuilder.group({
    login: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  registration(): void {
    this.authService.registration(this.form.value.login, this.form.value.email, this.form.value.password)
      .subscribe(() => this.navigateToMain(), () => this.alertWongCredentials());
  }

  private alertWongCredentials() {
    return this.snackBar.open('Имя или почта уже заняты!', '', {duration: 1000});
  }

  private navigateToMain() {
    return this.router.navigate([Urls.HELLO_PAGE]);
  }
}
