import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpWorkerService } from '../services/http-worker.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UsersSectionService } from '../services/user-section.services';

@Component({
  selector: 'app-root',
  template: `
<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">
      <img src="./assets/images/user_default_icon.png" id="icon" alt="User Icon" />
    </div>

    <!-- Login Form -->
    <form [formGroup]="LoginForm">
      <input type="text" id="login" name="email" class="fadeIn second" placeholder="email" #email formControlName="email">
      <input type="password" id="password" class="fadeIn third" name="pwd" placeholder="password" formControlName="password" #password>
      <input type="submit" value="Worker Log In" class="fadeIn fourth" (click) = "onClickSubmit(email.value, password.value)">
    </form>

    <!-- If not user -->
    <div class="alertDiv" *ngIf="errorOccured">
        <p class="alert alert-danger">{{errorMessage}}</p>
    </div>

    <!-- Remind Passowrd -->
    <div id="formFooter">
      <a class="underlineHover" href="#">Forgot Password?</a>
    </div>

  </div>
</div>
`
,
  styleUrls: ['./custom_styles/login.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  errorMessage:string;
  LoginForm: FormGroup;
  subscriber:Subscription;
  errorOccured: boolean = false;
  
  constructor(private fb: FormBuilder,private httpWorkerService:HttpWorkerService, private router:Router, private userDataService: UsersSectionService) {
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
        this.router.navigate(['/user/dashboard']);
        localStorage.setItem('user_data', JSON.stringify(data.user_data));
        localStorage.setItem('JWT', data.JWT);
      } else {
        this.errorMessage = 'Unknown Problem happened';
        this.errorOccured = true;
       }
     },
     error => {
        this.errorMessage = 'The email address or password is incorrect!';
        this.errorOccured = true;
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
