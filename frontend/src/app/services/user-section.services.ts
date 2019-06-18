import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersSectionService {

  public loggedUserObservable = new Subject();

  constructor() {}

  getUserData() {
    if (localStorage.user_data) {
        return JSON.parse(localStorage.user_data);
    }
    return false;
  }

  emitUserSectionStatus(val) {
    this.loggedUserObservable.next(val);
  }
}
