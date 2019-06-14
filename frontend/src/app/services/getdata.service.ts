import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { shareReplay } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class GetDataService {

    constructor(public http: HttpClient) {}

    getOnlineData() {
        // return this.http.get('https://randomuser.me/api/?results=10');
        return this.http.get('http://localhost:3000/restaurants');
    }

    getCachedData() {
        const storageData = JSON.parse(localStorage.onlineData).results;
        return from(storageData).pipe(shareReplay());
    }
}
