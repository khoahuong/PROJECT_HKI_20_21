import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DocumentComponent } from './admin/document/document.component';
import { HistoryUsersComponent } from './admin/history-users/history-users.component';
import { RegistrationComponent } from './admin/registration/registration.component';
import { UserInfoComponent } from './admin/user-info/user-info.component';
import { ViewFilesComponent } from './admin/view-files/view-files.component';
import { ViewRegisComponent } from './admin/view-regis/view-regis.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGaurdService } from './common/grant/auth-gaurd.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { RegisFormComponent } from './ulti/regis-form/regis-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'createAdminUser', component: CreateUserComponent, pathMatch: 'full' },
  { path: 'view-file', component: ViewFilesComponent, pathMatch: 'full' },
  {
    path: 'edu', component: AuthComponent,
    children: [
      { path: 'home', component: DashboardComponent, canActivate: [AuthGaurdService] },
      { path: 'userinfo', component: UserInfoComponent, canActivate: [AuthGaurdService] },
      { path: 'history', component: HistoryUsersComponent, canActivate: [AuthGaurdService] },
      { path: 'document', component: DocumentComponent, canActivate: [AuthGaurdService] },
      {
        path: 'registration', component: RegisFormComponent, canActivate: [AuthGaurdService],
        children: [
          { path: '', component: RegistrationComponent, canActivate: [AuthGaurdService] },
          { path: 'view', component: ViewRegisComponent, canActivate: [AuthGaurdService] }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
