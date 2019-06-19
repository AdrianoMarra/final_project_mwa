import { Component, OnInit } from '@angular/core';
import { UsersSectionService } from '../services/user-section.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  template: `
  <div class="container">
  <h3 class="mx-5 mt-4 mb-3"> Dashboard </h3>

   <div *ngIf="user">
        <h5 class="mx-5 mt-4"> {{ user.name.first }} {{ user.name.last }}! </h5>
    </div>

    <chart-component></chart-component>
  </div>`,
  styles: ['h3, h5 { font-weight: 300; }']
})
export class DashboardComponent implements OnInit {
    user: any;
    constructor(private userDataService: UsersSectionService, private router:Router) {
        this.user = this.userDataService.getUserData();
        this.userDataService.emitUserSectionStatus(true);
    }

    ngOnInit() {
      this.userDataService.getDashboardData().subscribe( (data: any) => {
        if (data.ok === false) {
          localStorage.clear();
          this.userDataService.emitUserSectionStatus(false);
          this.router.navigate(['user', 'login']);
        }
      });
    }
}
