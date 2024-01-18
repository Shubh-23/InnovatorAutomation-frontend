import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-module/login/login.component';

const routes: Routes = [
  {path:"",component:LoginComponent  },
  // {path:"",component:LoginComponent , canActivate: [AuthGuard] },
  // {path:"sign-up",component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
