import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  public resultsObservable = new Subject();

  constructor(public http: HttpClient) {}

  getAddresses(coord) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key='+environment.geolocationKey+'&latlng='+coord.lat+','+coord.long+'&sensor=true');
  }

  getData(query) {
    console.log(query);
    return this.http.get('http://localhost:3000/users', {
      params: new HttpParams({
        fromObject: query
      })
    });
  }

  emitResults(val) {
    this.resultsObservable.next(val);
  }
}
