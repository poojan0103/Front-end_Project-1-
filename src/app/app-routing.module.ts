import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { FormComponent } from './form/form.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  {path:"form",component:FormComponent},
  {path:"profile",component:ProfileComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
