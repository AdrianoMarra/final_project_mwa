import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'job',
  template: `

  <div class="container">
    <h1>Adding a new job</h1>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="job">Job title:</label>
        <input type="text" class="form-control" id="job" required>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea rows="4" cols="50" class="form-control" id="description"></textarea>
      </div>

      <button type="submit" class="btn btn-primary" >Add</button>

    </form>
</div>

  `,
})
export class JobComponent {
    myform: FormGroup;

    onSubmit() {
        console.log("Form Submitted!");
    }

}
