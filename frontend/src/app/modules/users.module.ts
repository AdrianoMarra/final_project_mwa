import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from '../components/user.component';
import { RegisterComponent } from '../components/register.component';
import { LoginComponent } from '../components/login.component';
import { JobComponent } from '../components/job.component';

@NgModule({
  declarations: [
    UserComponent,
    RegisterComponent,
    LoginComponent,
    JobComponent
  ],
  imports: [
    CommonModule ,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserComponent,
        children: [
          { path: 'register', component: RegisterComponent},
          { path: 'login', component: LoginComponent},
          { path: 'job', component: JobComponent},
        ]
    }])
  ],
  providers: [],
  bootstrap: [UserComponent]
})
export class UsersModule { }
