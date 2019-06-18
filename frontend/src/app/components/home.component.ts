import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `

  <h3 class="mx-5 mt-4 mb-3">Find the best workers near you! </h3>
  <app-search></app-search>

  <div class="dropdown-divider"></div>

  <h5 class="mx-5 mt-4">Workers matching your filters: </h5>
  <app-results></app-results>

  `,
  styles: ['h3, h5 { font-weight: 300; }']
})
export class HomeComponent {
}
