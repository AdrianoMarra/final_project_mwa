import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder,
   Validators, FormArray, 
   FormControl, 
   EmailValidator} from '@angular/forms';
import { HttpWorkerService } from '../services/http-worker.service';
import { environment } from 'src/environments/environment.prod';
import { Subscription } from 'rxjs';
import {  MustMatch } from '../helpers/validators';

@Component({
  selector: 'app-root',
  template: `
  <form [formGroup]="regGroupForm">
  <div name="personalInfo">  
  
        <div class="form-group1">
          <label>First Name</label>
          <input type = "text" name = "firstName"  placeholder = "First Name"  formControlName="firstName" [ngClass]="{ 'is-invalid': submitted && f.firstName.errors }"  #firstName>   
          <div *ngIf="submitted && f.firstName.errors">
              <div *ngIf="f.firstName.errors.required">First Name is required</div>
          </div>
        </div>
 
        <div class="form-group1">
        <label>Last Name</label>
        <input type = "text" name = "lastName" placeholder = "Last Name" formControlName="lastName" #lastName> 
        <div *ngIf="submitted && f.lastName.errors">
            <div *ngIf="f.lastName.errors.required">Last Name is required</div>
        </div>
        </div>
      
         <div class="form-group1">
         <label>Email</label>
         <input type = "text"  name = "email"  placeholder = "E-mail" formControlName="email"  #email>
         <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
            <div *ngIf="f.email.errors.required">Email is required</div>
            <div *ngIf="f.email.errors.email">Email must be a valid email address</div>
          </div>
         </div>    
       <div class="form-group1">
            <div class="form-group2">
                <label>Password</label>
                <input type = "password"  name = "password" placeholder = "Password" formControlName="password"  #password>
                <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                    <div *ngIf="f.password.errors.required">Password is required</div>
                    <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters</div>
                </div>
            </div>
            <div class="form-group2">
                <label>Confirm Password</label>
                <input type = "password"  name = "confirmPassword" placeholder = "Confirm Password" formControlName="confirmPassword" #confirmPassword>
                <div *ngIf="submitted && f.confirmPassword.errors" class="invalid-feedback">
                    <div *ngIf="f.confirmPassword.errors.required">Confirm Password is required</div>
                    <div *ngIf="f.confirmPassword.errors.mustMatch">Passwords must match</div>
                </div>
            </div>
         </div>
         <div formArrayName="phoneNumbers" style="float: none">
                <p>Phone Numbers</p>
                    <div *ngFor="let phoneNumber of regGroupForm.get('phoneNumbers').controls; let i = index">
                      <div *ngIf="regGroupForm.get('phoneNumbers').controls.length-1 > i; else LastEntryPhone">
                        <input type="text"  formControlName="{{i}}" disabled>
                        <button type="button" value="{{i}}" (click)="onDeletePhoneNumber($event)">-</button>
                      </div>
                      <ng-template #LastEntryPhone>
                          <input type="text" formControlName="{{i}}"  placeholder = "Personal Phone Number"/>
                          <button type="button" (click)="onAddPhoneNumber()">+</button>
                      </ng-template>                        
                  </div>
               </div>
               
               <input type = "text" name = "photoURL" placeholder = "Photo URL" formControlName="photoURL"  #photoURL> 
              <br/>     
              </div>
            
              <div name="ProfessionalInfo"> 
                    <input type = "text"   name = "jobTitle"  placeholder = "Job Title"  formControlName="jobTitle"  #jobTitel> 
                  <br/>  
                    <input type = "text" name = "jobDescription"  placeholder = "Job Description"  formControlName="jobDescription"  #jobDescription> 
                  <br/>  

                    <input type = "text" name = "hourRate"  placeholder = "Hour Rate"  formControlName="hourRate" #hourRate> 
                  <br/>  
                    <input type = "text" name = "yearsOfExperience" placeholder = "yearsOfExperience" formControlName="yearsOfExperience"  #yearsOfExperience> 
                  <br/>  
                  <input   type = "text" name = "description" placeholder = "Description"  formControlName="description"  #description> 
                  <br/>  
            
               </div>
 
              <div name="AddressInfo">
                <input type = "street"  name = "street"  placeholder = "Street" formControlName="street" #street> 
                <br/>  
                <input type = "text" name = "state"  placeholder = "State" formControlName="state" #state> 
                <br/>  
                <input type = "text" name = "City" placeholder = "City" formControlName="city"  #city> 
                <br/>  
                <input type = "text" name = "zipCode" placeholder = "Zip Code" formControlName="zipCode" #zipCode> 
                <br/>  
            </div> 
             <input type = "submit" value = "Register Worker" (click) = "registerWorker()">
      </form>`,
  styles: ['']
})
export class RegisterComponent implements OnInit,OnDestroy {
  phoneNumbers:string[]=[];
  errorMessage:string;
  regGroupForm: FormGroup;
  subscriber:Subscription;
  
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
    'jobTitle': ['', Validators.required],
    'jobDescription' : [''],
    'hourRate': ['', Validators.required],
    'yearsOfExperience' : [''],
    'street': ['', Validators.required],
    'city' : ['', Validators.required],
    'state': ['', Validators.required],
    'zipCode' : ['', Validators.required],
    'description' : [''],
    'phoneNumbers' : ['',Validators.required]  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
}

 

 onAddPhoneNumber(){
    (<FormArray>this.regGroupForm.controls['phoneNumbers']).push(new FormControl('', Validators.required));
  }

  onDeletePhoneNumber($event){
    (<FormArray>this.regGroupForm.controls['phoneNumbers']).removeAt($event.target.value);
  }

   ngOnInit() {
   
  }

    registerWorker(){

        const email=this.regGroupForm.controls['email'].value;                               
        const password=this.regGroupForm.controls['password'].value;                               
        const confirmPassword=this.regGroupForm.controls['confirmPassword'].value;                               
        const firstName=this.regGroupForm.controls['firstName'].value;                               
        const lastName=this.regGroupForm.controls['lastName'].value;                               
        const jobDescription=this.regGroupForm.controls['jobDescription'].value;                               
        const jobTitle=this.regGroupForm.controls['jobTitle'].value;                               
        const hourRate=this.regGroupForm.controls['hourRate'].value;                               
        const yearsOfExpereince=this.regGroupForm.controls['yearsOfExperience'].value;                               
        const street=this.regGroupForm.controls['street'].value;                               
        const city=this.regGroupForm.controls['city'].value;                               
        const state=this.regGroupForm.controls['state'].value;                               
        const zipCode=this.regGroupForm.controls['zipCode'].value;                               
        const description=this.regGroupForm.controls['description'].value;                               
        const photoURL=this.regGroupForm.controls['photoURL'].value;                               
        
        const name={
          "first":firstName,
          "last":lastName
        }
        
        const job={
          "title":jobTitle,
          "description":jobDescription
        }
        const address={
          "street":street,
          "state":state,
          "city":city,
          "zip_code":zipCode
        }

        //Job Id & Location Should be evaluated
        const validUser={
          "name":name,
          "email":email,                              
          "password":password,
          "job":job,
          "hour_rate":hourRate,
          "phone_number" :this.phoneNumbers[0],
          "experience" :yearsOfExpereince,
          "address" :address,
          "description":description,
          "photoURL":photoURL   
        }
      

        console.log(JSON.stringify(validUser)); 
        this.subscriber=this.httpWorkerService.postData('',validUser)
        .subscribe((data) => {
          console.log(data);
         if (data.JWT) {
             localStorage.setItem('JWT',data.JWT);
         } else {
           this.errorMessage = 'Unknown Problem happened';
          }
        },
        error => {
           console.log(error);
            this.errorMessage = 'The email address or password is incorrect!';
        }
      );
      return false;  
    }
  
    ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  
  }


  get f() { return this.regGroupForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.regGroupForm.invalid) {
          return;
      }
  }

  onReset() {
      this.submitted = false;
      this.regGroupForm.reset();
  }



}
