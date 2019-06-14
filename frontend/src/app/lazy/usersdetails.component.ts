import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { GetDataService } from '../services/getdata.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'users-details',
  template: `<p> USER DETAILS </p>
  <div> {{ uuid }} - {{ userData.name.first }} {{ userData.name.last }} </div>
  <div> {{ userData.email }} </div>
  <div> {{ userData.cell }} </div>
  <div> {{ userData.nat }} </div>
  `,
})
export class UsersDetailsComponent implements OnInit, OnDestroy, DoCheck {
  public users = [];
  public userData = {};
  public uuid: string;
  private subscription: Subscription;

  constructor(private getDataService: GetDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.uuid = params.get('uuid');
    });

    const source$ = this.getDataService.getCachedData();
    this.subscription = source$.subscribe(data => this.users.push(data));
    this.userData = this.users.slice(Number(this.uuid), Number(this.uuid) + 1)[0];
  }

  ngDoCheck() {
    this.userData = this.users.slice(Number(this.uuid), Number(this.uuid) + 1)[0];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
