import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder,
   Validators, FormArray,
   FormControl,
   EmailValidator} from '@angular/forms';
import { HttpWorkerService } from '../services/http-worker.service';
import { environment } from 'src/environments/environment';
import { Subscription, Subscriber } from 'rxjs';
import {  MustMatch } from '../helpers/validators';
import { Router } from '@angular/router';
import { UsersSectionService } from '../services/user-section.services';

@Component({
  selector: 'app-root',
  templateUrl: './templates/registration.html',
  styles: ['']
})
export class RegisterComponent {
  errorMessage:string;
  regGroupForm: FormGroup;
  subscriber:Subscription;
  isvalidEmail:boolean;
  submitted = false;

  constructor(private fb: FormBuilder, private httpWorkerService: HttpWorkerService, private router:Router, private userDataService: UsersSectionService) {
    this.createForm();
  }
  createForm() {
      this.regGroupForm = this.fb.group({
    'email': ['', [
        Validators.required,
        new EmailValidator()
      ]],
    'password': ['', Validators.required],
    'confirmPassword': ['', Validators.required],
    'firstName': ['', Validators.required],
    'lastName': ['', Validators.required],
    // 'photoURL' : [''],
    // 'hourRate': [''],
    // 'yearsOfExperience' : [''],
    // 'street': ['', Validators.required],
    // 'city' : ['', Validators.required],
    // 'state': ['', Validators.required],
    // 'zipCode' : ['', Validators.required],
    // 'description' : [''],
    'phoneNumber' : ['', Validators.required]  },
    {
     validator: MustMatch('password', 'confirmPassword')
  });
}

    registerWorker() {

      this.submitted = true;
      // stop here if form is invalid
      if (this.regGroupForm.invalid) {
          return;
      }

      const email = this.regGroupForm.controls['email'].value;
      const password = this.regGroupForm.controls['password'].value;
      const firstName = this.regGroupForm.controls['firstName'].value;
      const lastName = this.regGroupForm.controls['lastName'].value;
      // const hourRate = this.regGroupForm.controls['hourRate'].value;
      // const yearsOfExpereince = this.regGroupForm.controls['yearsOfExperience'].value;
      // const street = this.regGroupForm.controls['street'].value;
      // const city = this.regGroupForm.controls['city'].value;
      // const state = this.regGroupForm.controls['state'].value;
      // const zipCode = this.regGroupForm.controls['zipCode'].value;
      // const description = this.regGroupForm.controls['description'].value;
      // const photoURL = this.regGroupForm.controls['photoURL'].value;
      const phoneNumber = this.regGroupForm.controls['phoneNumber'].value;

      const name = {
        'first': firstName,
        'last': lastName
      };

      const address = {
        "location": {
          "type": "Point",
          "coordinates": [-91.9704082, 41.0127968]
        },
        "street": "508 N 4th St",
        "state": "IA",
        "city": "Fairfield",
        "zip_code": "52556"
      }

      const job = {
        "id": 1,
        "title": "Backend developer",
        "description": "Design and develop server side web applications"
      }

      //Job Id & Location Should be evaluated
      const validUser = {
        "name": name,
        "email": email,
        "password": password,
        "job": job,
        "hour_rate": 35,
        "phone_number": phoneNumber,
        "experience": 10,
        "address": address,
        "description": 'Software developer, full-stack with 4 years of experience',
        "photoURL": ''
      }

      this.httpWorkerService.checkEmailTaken(email, environment.VALIDATE_EMAIL)
      .subscribe((data: any) => {
        if (!data.emailTaken) {
           this.subscriber = this.httpWorkerService.postData('', validUser)
          .subscribe((data) => {
          this.submitted = false;
          this.regGroupForm.reset();
          if (data.JWT) {
            this.userDataService.emitUserSectionStatus(true);
            this.router.navigate(['/user/dashboard']);
            localStorage.setItem('user_data', JSON.stringify(data.user_data));
            localStorage.setItem('JWT', data.JWT);
          } else {
            this.errorMessage = 'Unknown Problem happened';
            }
        },
        error => {
           console.log(error);
          }
      );
         } else {
          alert('This email is already taken, please chose other');
         }
        }, err => console.log(err),
        () => console.log('complete'));

      return false;
    }

  get f() { return this.regGroupForm.controls; }

  onReset() {
      this.submitted = false;
      this.regGroupForm.reset();
  }
}
