import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./layouts/content/login/login.component";
import {Urls} from "./utils/urls";
import {AuthGuard} from "./guards/auth.guard";
import {UserRole} from "./models/user-role";
import {HelloPageComponent} from "./layouts/content/hello-page/hello-page.component";
import {AllTeamResolver} from "./resolvers/all-team.resolver";
import {TeamComponent} from "./layouts/content/team/team.component";

const routes: Routes = [
  {
    path: Urls.LOGIN,
    component: LoginComponent
  },
  {
    path: Urls.HELLO_PAGE,
    component: HelloPageComponent,
    // resolve: {exchangeRates: ExchangeRatesResolver},
    // canActivate: [AuthGuard],
    // data: {roles: [UserRole.USER]}
  },
  {
    path: Urls.TEAMS,
    component: TeamComponent,
    // resolve: {conversions: AllTeamResolver},
    // canActivate: [AuthGuard],
    // data: {roles: [UserRole.USER]}
  },
  // {
  //   path: Urls.ALL_HISTORY,
  //   component: AllHistoryComponent,
  //   resolve: {conversions: AllUsersConversionsResolver},
  //   // canActivate: [AuthGuard],
  //   // data: {roles: [UserRole.USER]}
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
