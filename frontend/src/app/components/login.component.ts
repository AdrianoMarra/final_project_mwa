import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpWorkerService } from '../services/http-worker.service';
import { environment } from 'src/environments/environment.prod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<form [formGroup]="LoginForm">
  <input type = "text" 
        name = "email" 
        placeholder = "email" 
        formControlName="email" 
        #email>
  <br/>
  <input type = "password" 
        name = "pwd" 
        placeholder = "password" 
        formControlName="password" 
        #password>
  <br/>
  <input type = "submit" 
          value = "Worker Login " 
          (click) = "onClickSubmit(email.value, password.value)">
</form>`,
  styles: ['']
})
export class LoginComponent implements OnInit,OnDestroy {
  
  errorMessage:string;
  LoginForm: FormGroup;
  subscriber:Subscription;
  
  constructor(private fb: FormBuilder,private httpWorkerService:HttpWorkerService) {
    this.createForm();
  }
  createForm() {
    this.LoginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
    'password': ['', Validators.required]
    });
  }

  onClickSubmit(email, password) {
     this.subscriber=this.httpWorkerService.postData(environment.AUTHENTICATE,{'email':email,'password':password})
     .subscribe((data) => {
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
  }
   ngOnInit() {
   }

   ngOnDestroy(): void {
    if(this.subscriber) 
       this.subscriber.unsubscribe();
  }
}
