import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./layouts/content/login/login.component";
import {Urls} from "./utils/urls";
import {AuthGuard} from "./guards/auth.guard";
import {UserRole} from "./models/user-role";
import {HelloPageComponent} from "./layouts/content/hello-page/hello-page.component";
import {AllTeamResolver} from "./resolvers/all-team.resolver";
import {TeamComponent} from "./layouts/content/team/team.component";
import {EmployeesComponent} from "./layouts/content/employees/employees.component";
import {RegistrationComponent} from "./layouts/content/registration/registration.component";

const routes: Routes = [
  {
    path: Urls.LOGIN,
    component: LoginComponent
  },
  {
    path: Urls.REG,
    component: RegistrationComponent
  },
  {
    path: Urls.HELLO_PAGE,
    component: HelloPageComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRole.USER, UserRole.ADMIN]}
  },
  {
    path: Urls.TEAMS,
    component: TeamComponent,
    resolve: {conversions: AllTeamResolver},
    canActivate: [AuthGuard],
    data: {roles: [UserRole.USER, UserRole.ADMIN]}
  },
  {
    path: Urls.EMPLOYEES,
    component: EmployeesComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRole.ADMIN]}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
