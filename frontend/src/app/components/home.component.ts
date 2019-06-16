import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `

  <app-search></app-search>

  <div class="dropdown-divider"></div>
  <h5 class="mx-5 mt-4">Workers matching your filters: </h5>

  <app-results></app-results>

  `,
})
export class HomeComponent {
}
