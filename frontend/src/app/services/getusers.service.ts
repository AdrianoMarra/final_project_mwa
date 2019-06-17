import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(public http: HttpClient) {}

  getData(query) {
    return this.http.get('http://localhost:3000/users', {
      params: new HttpParams({
        fromObject: query
      })
    });
  }
}
