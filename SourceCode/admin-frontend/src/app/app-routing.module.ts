import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserInfoComponent } from './admin/user-info/user-info.component';
import { AuthComponent } from './auth/auth.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'createAdminUser', component: CreateUserComponent, pathMatch: 'full' },
  {
    path: 'edu', component: AuthComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'userinfo', component: UserInfoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
