import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetDataService } from './services/getdata.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  template: `
    <h1>App Component</h1>
    <a [routerLink]="['/']">Restaurants</a> |
    <a [routerLink]="['users']">Users</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnDestroy {

    private subscription: Subscription;

    constructor(private getDataService: GetDataService) {
      // this.subscription = getDataService.getOnlineData().subscribe(resp => {
        // localStorage.onlineData = JSON.stringify(resp);
      // });
    }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
