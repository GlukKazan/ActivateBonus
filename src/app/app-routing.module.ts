import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BonusComponent } from './bonus/bonus.component';
import { CurrComponent } from './curr/curr.component';
import { JoinComponent } from './join/join.component';
import { JwtGuard } from './jwt.guard';
import { LaunchComponent } from './launch/launch.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { RegComponent } from './reg/reg.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'reg', component: RegComponent },
  { path: 'map', component: MapComponent },
  { path: 'bonus', component: BonusComponent, canActivate: [JwtGuard] },
  { path: 'launch/:g/:v/:s', component: LaunchComponent, canActivate: [JwtGuard] },
  { path: 'launch/:g/:v', component: LaunchComponent, canActivate: [JwtGuard] },
  { path: 'launch/:g', component: LaunchComponent, canActivate: [JwtGuard] },
  { path: 'launch', component: LaunchComponent, canActivate: [JwtGuard] },
  { path: 'join', component: JoinComponent, canActivate: [JwtGuard] },
  { path: 'watch', component: WatchComponent, canActivate: [JwtGuard] },
  { path: 'curr', component: CurrComponent, canActivate: [JwtGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [JwtGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
