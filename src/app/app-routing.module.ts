import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BonusComponent } from './bonus/bonus.component';
import { JoinComponent } from './join/join.component';
import { JwtGuard } from './jwt.guard';
import { LaunchComponent } from './launch/launch.component';
import { RegComponent } from './reg/reg.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'reg', component: RegComponent },
  { path: 'bonus', component: BonusComponent, canActivate: [JwtGuard] },
  { path: 'launch', component: LaunchComponent, canActivate: [JwtGuard] },
  { path: 'join', component: JoinComponent, canActivate: [JwtGuard] },
  { path: 'watch', component: WatchComponent, canActivate: [JwtGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
