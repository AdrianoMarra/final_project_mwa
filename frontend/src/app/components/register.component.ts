import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'register',
  template: `<p>Create your account: </p>

	<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
		<input type="text" name="email" [formControl]="myForm.get('email')">
		<div *ngIf="!myForm.get('email').valid">Invalid Email</div>
		<div *ngIf="myForm.get('email').hasError('invalid')">Error</div>
		<button type="submit" [disabled]="!myForm.valid">Submit</button>
	</form>

  `,
})
export class RegisterComponent {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = fb.group({
      'email': ['adrianomarra90@gmail.com', Validators.compose([Validators.required, this.validator])]
    });
  }

  validator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== 'adrianomarra90@gmail.com') {
      return {'invalid': true};
    }
    return null;
  }

  onSubmit(): void {
    console.log(this.myForm.value);
  }

}
