import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JobService } from '../services/job.service';

@Component({
  selector: 'job',
  template: `

  <div class="container">
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

  `,
})
export class JobComponent {
  myForm: FormGroup;

    constructor(private saveJobService: JobService, private fb: FormBuilder) {
      this.myForm = fb.group({
        'title': '',
        'description': ''
      });
    }
    onSubmit() {
      this.saveJobService.saveJob(this.myForm.value).subscribe((res) => {
        console.log("Form Submitted!");
      }, (err) => {
        console.log("Form Failed!"), err;
      });
    }
}
