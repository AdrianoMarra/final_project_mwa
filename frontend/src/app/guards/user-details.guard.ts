import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsGuard implements CanActivate {

  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let routeId = route.paramMap.get('uuid');
    if (Number(routeId) < 10 && Number(routeId) >= 0) {
        return true;
    } else {
        // Here we should redirect to a 404 page but instead it
        // is just sending to home because I didnt have time
        // to create the 404 page...
        this.router.navigate([''], { skipLocationChange: true });
    }
  }
}
