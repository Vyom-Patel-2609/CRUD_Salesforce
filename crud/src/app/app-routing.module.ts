import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TokenComponent } from './token/token.component';
import { SalesforceComponent } from './salesforce/salesforce.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'salesforce',
    component: SalesforceComponent
  },
  {
    path: '**',
    component: TokenComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
