import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder,
   Validators, FormArray, 
   FormControl, 
   EmailValidator} from '@angular/forms';
import { HttpWorkerService } from '../services/http-worker.service';
import { environment } from 'src/environments/environment.prod';
import { Subscription, Subscriber } from 'rxjs';
import {  MustMatch } from '../helpers/validators';

@Component({
  selector: 'app-root',
  template: ` <form [formGroup]="regGroupForm">
                <div name="personalInfo">  
                    <div class="form-group col-5">
                          <label>First Name</label>
                          <input type="text" placeHolder='First Name' formControlName="firstName" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.firstName.errors }" #firstName/>
                          <div *ngIf="submitted && f.firstName.errors" class="invalid-feedback">
                              <div *ngIf="f.firstName.errors.required">First Name is required</div>
                          </div>
                      </div>
                      <div class="form-group col-5">
                          <label>Last Name</label>
                          <input type="text" placeHolder='Last Name' formControlName="lastName" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.lastName.errors }" #lastName />
                          <div *ngIf="submitted && f.lastName.errors" class="invalid-feedback">
                              <div *ngIf="f.lastName.errors.required">Last Name is required</div>
                          </div>
                      </div>
                      <div class="form-group">
                        <label>Email</label>
                          <input type="text" placeHolder='Email' formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.email.errors }"  #email/>
                          <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
                              <div *ngIf="f.email.errors.usedEmail" >Email is used before</div>
                              <div *ngIf="f.email.errors.required">Email is required</div>
                              <div *ngIf="f.email.errors.email">Email must be a valid email address</div>
                          </div>
                      </div>
                    <div class="form-row">
                      <div class="form-group col">
                          <label>Password</label>
                          <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" #password/>
                          <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                              <div *ngIf="f.password.errors.required">Password is required</div>
                              <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters</div>
                          </div>
                      </div>
                      <div class="form-group col">
                        <label>Confirm Password</label>
                        <input type="password" formControlName="confirmPassword" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.confirmPassword.errors }" #confirmPassword />
                        <div *ngIf="submitted && f.confirmPassword.errors" class="invalid-feedback">
                            <div *ngIf="f.confirmPassword.errors.required">Confirm Password is required</div>
                            <div *ngIf="f.confirmPassword.errors.mustMatch">Passwords must match</div>
                        </div>
                      </div>
                </div>   
                <div class="form-group col-5">
                  <label>Phone Number</label>
                  <input type="text" placeHolder='ex. 641 451 0170' formControlName="phoneNumber" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.phoneNumber.errors }" #phoneNumber />
                      <div *ngIf="submitted && f.phoneNumber.errors" class="invalid-feedback">
                          <div *ngIf="f.phoneNumber.errors.required">Phone Number is required in the right format</div>
                      </div>
                 </div>
                 <div>  
                      <input type = "text" name = "photoURL" placeholder = "Photo URL" formControlName="photoURL"  #photoURL> 
                 </div> 
              </div>
              <div name="ProfessionalInfo"> 
                  <input type = "text"  name = "jobTitle"  placeholder = "Job Title"  formControlName="jobTitle"  #jobTitel> 
                  <input type = "text" name = "hourRate"  placeholder = "Hour Rate"  formControlName="hourRate" #hourRate> 
                  <input type = "text" name = "yearsOfExperience" placeholder = "yearsOfExperience" formControlName="yearsOfExperience"  #yearsOfExperience> 
                  <input type = "text" name = "description" placeholder = "Description"  formControlName="description"  #description> 
              </div>
              <div name="AddressInfo">
                <input type = "street"  name = "street"  placeholder = "Street" formControlName="street" #street> 
                <input type = "text" name = "state"  placeholder = "State" formControlName="state" #state> 
                <input type = "text" name = "City" placeholder = "City" formControlName="city"  #city> 
                <input type = "text" name = "zipCode" placeholder = "Zip Code" formControlName="zipCode" #zipCode> 
              </div> 
              <input type = "submit" value = "Register Worker" (click) = "registerWorker()">
       </form>`,
  styles: ['']
})
export class RegisterComponent implements OnInit {
  phoneNumbers:string[]=[];
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
    'jobTitle': ['', Validators.required],
    'jobDescription' : [''],
    'hourRate': ['', Validators.required],
    'yearsOfExperience' : [''],
    'street': ['', Validators.required],
    'city' : ['', Validators.required],
    'state': ['', Validators.required],
    'zipCode' : ['', Validators.required],
    'description' : ['',Validators.required],
    'phoneNumber' : ['',Validators.required]  }, {
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
        this.submitted = true;
        // stop here if form is invalid
        if (this.regGroupForm.invalid) {
            return;
        }

   
        const email=this.regGroupForm.controls['email'].value;                               
        const password=this.regGroupForm.controls['password'].value;                               
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
      
      this.httpWorkerService.checkEmailNotTaken(email,environment.VALIDATE_MAIL).subscribe((data:any) => {
          if (data.emailNotTaken) {
           console.log(data.emailNotTaken);
           this.subscriber=this.httpWorkerService.postData('',validUser)
          .subscribe((data) => {
          this.submitted = false;
          this.regGroupForm.reset();
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
         } else { 
       //   this.regGroupForm.controls['email'].errors.push("usedEmail");  
         console.log("email is not valid ,it's used before");  
         }
      
        },err=>console.log(err),()=>console.log("complete")) ;
      return false;  
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
