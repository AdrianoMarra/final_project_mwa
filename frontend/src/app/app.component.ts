import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Find the right worker app.</h1>
    <a [routerLink]="['/']">Home page</a> |
    <a [routerLink]="['user', 'register']">Register</a> |
    <a [routerLink]="['user', 'login']">Login</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
