import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpWorkerService {

  baseAPIURL: string;
  currentuser: any;
  token: string;
  myheader: any;

  constructor(public http: HttpClient) {
    this.baseAPIURL = environment.API_URL;
  }

  // General http get
  getData(action: string): Observable<any> {
    return this.http.get(this.baseAPIURL + action);
  }

  // General http post
  postData(action: string, body): Observable<any> {
    
    return this.http.post(this.baseAPIURL + action, body);
  }

  // General http put
  patchData(action: string, body): Observable<any> {
    return this.http.patch(this.baseAPIURL + action, body);
  }


}
