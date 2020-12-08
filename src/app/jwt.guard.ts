import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | boolean {
        const path = route.routeConfig.path;
        if (/^launch\//.test(path)) {
            const params = route.params;
            const r = path.replace(':g', params.g).replace(':v', params.v);
            localStorage.setItem('currGame', r);
        }
        let token = localStorage.getItem('myAuthToken');
        return !!token;
      }    
}