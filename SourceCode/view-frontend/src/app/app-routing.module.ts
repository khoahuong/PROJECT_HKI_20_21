import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGaurdService } from './common/grant/auth-gaurd.service';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './view/create-user/create-user.component';
import { RegisEditComponent } from './view/regis-edit/regis-edit.component';
import { RegisIndexComponent } from './view/regis-index/regis-index.component';
import { RegisViewComponent } from './view/regis-view/regis-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'createUser', component: CreateUserComponent, pathMatch: 'full' },
  {
    path: 'regis', component: AuthComponent,
    children: [
      { path: 'home', component: RegisIndexComponent, canActivate: [AuthGaurdService] },
      { path: 'edit', component: RegisEditComponent, canActivate: [AuthGaurdService] },
      { path: 'view', component: RegisViewComponent, canActivate: [AuthGaurdService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
