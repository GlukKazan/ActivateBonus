import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BonusComponent } from './bonus/bonus.component';
import { JwtGuard } from './jwt.guard';
import { RegComponent } from './reg/reg.component';


const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'reg', component: RegComponent },
  { path: 'bonus', component: BonusComponent, canActivate: [JwtGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
