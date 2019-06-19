import { Component } from '@angular/core';
import { UsersSectionService } from '../services/user-section.services';

@Component({
  selector: 'app-user-dashboard',
  template: `
  <div class="container">
    <h1 style="margin-bottom: 40px;">Dashboard user</h1>

   <!-- <div *ngIf="user">
        <pre> Welcome, {{ user.email }} </pre>
    </div> -->

    <chart-component></chart-component>
  </div>


  `,
})
export class DashboardComponent {

    user: any;

    constructor(private userDataService: UsersSectionService) {
        this.user = this.userDataService.getUserData();
        this.userDataService.emitUserSectionStatus(true);
    }
}
