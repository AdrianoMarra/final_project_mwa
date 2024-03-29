import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  public resultsObservable = new Subject();

  constructor(public http: HttpClient) {}

  saveJob(query) {
    // console.log(query);
    return this.http.post('http://localhost:3000/job', {
      query
    });
  }

   getJobs() {
    return this.http.get('http://localhost:3000/job', {});
  } 
  
  deleteJob(id) {
    return this.http.delete('http://localhost:3000/job/'+id, {});
  } 
}
