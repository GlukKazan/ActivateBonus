import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BonusComponent } from './bonus/bonus.component';
import { JwtGuard } from './jwt.guard';
import { LaunchComponent } from './launch/launch.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { RegComponent } from './reg/reg.component';
import { SessionComponent } from './session/session.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'reg', component: RegComponent },
  { path: 'map', component: MapComponent },
  { path: 'bonus', component: BonusComponent, canActivate: [JwtGuard] },
  { path: 'launch/:g/:v/:s', component: LaunchComponent, canActivate: [JwtGuard] },
  { path: 'launch/:g/:v', component: LaunchComponent, canActivate: [JwtGuard] },
  { path: 'launch/:g', component: LaunchComponent, canActivate: [JwtGuard] },
  { path: 'launch', component: LaunchComponent, canActivate: [JwtGuard] },
  { path: 'session/:s/:g/:v', component: SessionComponent, canActivate: [JwtGuard] },
  { path: 'session/:s/:g', component: SessionComponent, canActivate: [JwtGuard] },
  { path: 'session/:s', component: SessionComponent, canActivate: [JwtGuard] },
  { path: 'session', component: SessionComponent, canActivate: [JwtGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [JwtGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
