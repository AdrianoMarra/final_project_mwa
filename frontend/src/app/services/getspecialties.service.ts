import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetSpecialtiesService {

  constructor(public http: HttpClient) {}

  getData() {
    return this.http.get('https://randomuser.me/api/?results=10');
  }

}
