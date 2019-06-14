import { Component, OnInit } from '@angular/core';
import { GetDataService } from './services/getdata.service';

@Component({
  selector: 'app-home',
  template: `
    <p> RESTAURANTS LIST: </p>

    <ul>
      <li *ngFor="let restaurant of restaurantsData | async index as i;"> {{ restaurant.name }} </li>
    <ul>
  `,
})
export class HomeComponent implements OnInit {

  public restaurantsData: any;

  constructor(private getDataService: GetDataService) {}

  ngOnInit() {
    this.restaurantsData = this.getDataService.getOnlineData();
  }
}
