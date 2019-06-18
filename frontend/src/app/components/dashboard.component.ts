import { Component } from '@angular/core';
import { UsersSectionService } from '../services/user-section.services';

@Component({
  selector: 'app-user-dashboard',
  template: `

    <h1>Dashboard user</h1>

    <div *ngIf="user">
        <pre> {{ user.email }} </pre>
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
