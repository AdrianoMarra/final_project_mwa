import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetDataService } from '../services/getdata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'users',
  template: `<p>USERS LIST: </p>
  <ul>
    <li *ngFor="let item of users$ index as i; ">
      <a [routerLink]="[i]">{{i}} - {{item.name.first}} {{item.name.last}}</a>
    </li>
  </ul>
  <router-outlet></router-outlet>
  `,
})
export class UsersComponent implements OnInit, OnDestroy {
  public users$ = [];
  private subscription: Subscription;
  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    const source = this.getDataService.getCachedData();
    this.subscription = source.subscribe(resp => this.users$.push(resp));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
