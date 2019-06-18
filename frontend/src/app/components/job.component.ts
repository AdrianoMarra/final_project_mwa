import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JobService } from '../services/job.service';

@Component({
  selector: 'job',
  template: `

  <div class="container">
  <div  *ngIf="show_dialog">
    <h1>Adding a new job</h1>
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="job">Job title:</label>
        <input type="text" class="form-control" name="title" [formControl]="myForm.get('title')" required>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea rows="4" cols="50" class="form-control" name="description" [formControl]="myForm.get('description')"></textarea>
      </div>

      <button type="submit" class="btn btn-primary" >Add</button>

    </form>
    </div>
    <div  *ngIf="show_response">
    <p>{{response_txt}}</p>
    </div>
    <br/>
    <h3>Job list</h3>
    <table class="table table-striped">
      <thead class="grey lighten-1 black-text">
        <tr>
          <th >Id</th>
          <th >Title</th>
          <th >Description</th>
        </tr>
      </thead>
      <tbody>
        <tr mdbTableCol *ngFor="let job of jobs">
            <th scope="row">{{job.id}}</th>
            <td>{{job.title}}</td>
            <td>{{job.description}}</td>
          </tr>
        </tbody>
      </table>
  </div>

  `,
})
export class JobComponent {
  myForm: FormGroup;
  show_dialog: boolean = true;
  show_response: boolean = false;
  response_txt: String;
  jobs: any;

    constructor(private saveJobService: JobService, private fb: FormBuilder) {
      this.myForm = fb.group({
        'title': '',
        'description': ''
      });
      this.loadingJobs();
    }
    onSubmit() {
      this.saveJobService.saveJob(this.myForm.value).subscribe((res) => {
        this.response_txt = "A job added successfully";
      }, (err) => {
        this.response_txt = "Could not add a job!";
      });
      this.show_dialog = false;
      this.show_response = true;
    }
    loadingJobs() {
      this.saveJobService.getJobs().subscribe((res) => {
      this.jobs = res['results']; 
      }, (err) => {
        console.log('error', err);
      });
    }
}
