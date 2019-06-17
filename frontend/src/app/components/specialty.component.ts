import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'specialty',
  template: `

  <div class="container">
    <h1>Adding a specialty</h1>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="specialty">Specialty name:</label>
        <input type="text" class="form-control" id="specialty" required>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description"/>
      </div>

      <button type="submit" class="btn btn-primary" >Add</button>

    </form>
</div>

  `,
})
export class SpecialtyComponent {
    myform: FormGroup;

    onSubmit() {
        console.log("Form Submitted!");
    }

}
