import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `

  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
  <a class="navbar-brand" [routerLink]="['/']">Find the right worker</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a class="nav-link" [routerLink]="['user', 'register']">New Account</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['user', 'login']">Login</a>
      </li>
    </ul>
  </div>
</nav>

  `,
})
export class MenuComponent {
}
