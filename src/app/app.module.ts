import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {LoginComponent} from './layouts/content/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSortModule} from '@angular/material/sort';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiPrefixInterceptor} from "./interceptors/api-prefix.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SecurityInterceptor} from "./interceptors/security.interceptor";
import { HelloPageComponent } from './layouts/content/hello-page/hello-page.component';
import { TeamComponent } from './layouts/content/team/team.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import { EmployeesComponent } from './layouts/content/employees/employees.component';
import {EditTeamComponent} from "./layouts/content/team/edit-team/edit-team.component";
import { EditEmployeesComponent } from './layouts/content/employees/edit-employees/edit-employees.component';
import { RegistrationComponent } from './layouts/content/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HelloPageComponent,
    TeamComponent,
    EditTeamComponent,
    EmployeesComponent,
    EditEmployeesComponent,
    RegistrationComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatCardModule,
        NgbModule,
        BrowserAnimationsModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatSortModule,
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        FormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
