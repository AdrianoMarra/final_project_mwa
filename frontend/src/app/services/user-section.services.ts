import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersSectionService {

  public loggedUserObservable = new Subject();

  constructor(public http: HttpClient) {}

  getUserData() {
    if (localStorage.user_data) {
        return JSON.parse(localStorage.user_data);
    }
    return false;
  }

  emitUserSectionStatus(val) {
    this.loggedUserObservable.next(val);
  }

  getDashboardData() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Bearer': localStorage.JWT
      })
    };

    return this.http.get('http://localhost:3000/users/dashboard', httpOptions);
  }
}
