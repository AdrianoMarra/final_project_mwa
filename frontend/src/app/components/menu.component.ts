import { Component, OnInit } from '@angular/core';
import { UsersSectionService } from '../services/user-section.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  template: `

  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
  <a class="navbar-brand" [routerLink]="['/']">Find the right worker</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active" *ngIf="!userLogged">
        <a class="nav-link" [routerLink]="['user', 'register']" style="border: white solid 1px;
        border-radius: 5px;">Become a worker!</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" [routerLink]="['user', 'job']" style="border: white solid 1px;
        border-radius: 5px;">Add a job</a>
      </li>

      <li class="nav-item active" *ngIf="!userLogged">
        <a class="nav-link" [routerLink]="['user', 'login']">Login</a>
      </li>

      <li class="nav-item active" *ngIf="userLogged">
      <a class="nav-link" href=javascript:void(0) (click)=logout()>Log out</a>
    </li>
    </ul>
  </div>
</nav>

  `,
  styles: [`.nav-link {
      margin-left: 10px;
  }`],
})
export class MenuComponent implements OnInit {

  userLogged: boolean;

  constructor(private userDataService: UsersSectionService, private router:Router) {
    this.userDataService.loggedUserObservable.subscribe((status: boolean) => {
      this.userLogged = status;
    });
  }

  ngOnInit() {
    if (this.userDataService.getUserData()) {
      this.userLogged = true;
    }
  }

  logout() {
    localStorage.clear();
    this.userLogged = false;
    this.router.navigate(['']);
  }

}
