import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisIndexComponent } from './view/regis-index/regis-index.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '', component: RegisIndexComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
