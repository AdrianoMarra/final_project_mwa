import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder,
   Validators, FormArray, 
   FormControl, 
   EmailValidator} from '@angular/forms';
import { HttpWorkerService } from '../services/http-worker.service';
import { environment } from 'src/environments/environment';
import { Subscription, Subscriber } from 'rxjs';
import {  MustMatch } from '../helpers/validators';

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
  
  constructor(private fb: FormBuilder,private httpWorkerService:HttpWorkerService) {
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
    'photoURL' : [''],
    'hourRate': [''],
    'yearsOfExperience' : [''],
    'street': ['', Validators.required],
    'city' : ['', Validators.required],
    'state': ['', Validators.required],
    'zipCode' : ['', Validators.required],
    'description' : [''],
    'phoneNumber' : ['',Validators.required]  },
    {
     validator: MustMatch('password', 'confirmPassword')
  });
}

    registerWorker() {

      console.log(this.regGroupForm.invalid);

        this.submitted = true;
        // stop here if form is invalid
        if (this.regGroupForm.invalid) {
            return;
        }

        const email=this.regGroupForm.controls['email'].value;                               
        const password=this.regGroupForm.controls['password'].value;                               
        const firstName=this.regGroupForm.controls['firstName'].value;                               
        const lastName=this.regGroupForm.controls['lastName'].value;                               
        // const jobDescription=this.regGroupForm.controls['jobDescription'].value;                               
        // const jobTitle=this.regGroupForm.controls['jobTitle'].value;                               
        const hourRate=this.regGroupForm.controls['hourRate'].value;                               
        const yearsOfExpereince=this.regGroupForm.controls['yearsOfExperience'].value;                               
        const street=this.regGroupForm.controls['street'].value;                               
        const city=this.regGroupForm.controls['city'].value;                               
        const state=this.regGroupForm.controls['state'].value;                               
        const zipCode=this.regGroupForm.controls['zipCode'].value;                               
        const description=this.regGroupForm.controls['description'].value;                               
        const photoURL=this.regGroupForm.controls['photoURL'].value;     
        const phoneNumber = this.regGroupForm.controls['phoneNumber'].value;                                                         

        const name = {
          'first': firstName,
          'last': lastName
        };

        const address = {
          "street": street,
          "state": state,
          "city": city,
          "zip_code": zipCode
        }

        //Job Id & Location Should be evaluated
        const validUser={
          "name": name,
          "email": email,
          "password": password,
          "hour_rate": hourRate,
          "phone_number": phoneNumber,
          "experience" :yearsOfExpereince,
          "address" :address,
          "description":description,
          "photoURL":photoURL
        }
      
      this.httpWorkerService.checkEmailNotTaken(email, environment.VALIDATE_EMAIL).subscribe((data:any) => {
        console.log(data.emailNotTaken);
        if (data.emailNotTaken) {
           console.log(validUser);
      //      this.subscriber=this.httpWorkerService.postData('', validUser)
      //     .subscribe((data) => {
      //     this.submitted = false;
      //     this.regGroupForm.reset();
      //     console.log(data);
      //    if (data.JWT) {
      //        localStorage.setItem('JWT',data.JWT);
      //    } else {
      //      this.errorMessage = 'Unknown Problem happened';
      //     }
      //   },
      //   error => {
      //      console.log(error);
      //       this.errorMessage = 'The email address or password is incorrect!';
      //     }
      // );
         } else { 
          alert("This email is already taken, please chose other");
         }
      
        }, err => console.log(err),
        () => console.log("complete"));

      return false;
    }

  get f() { return this.regGroupForm.controls; }

  onReset() {
      this.submitted = false;
      this.regGroupForm.reset();
  }
}
