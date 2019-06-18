import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {

  constructor(private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (localStorage.getItem('JWT')) {
        return true;
    } else {
        this.router.navigate(['/user/login']);
    }
  }
}
