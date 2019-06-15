import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserComponent } from '../components/user.component';
import { RegisterComponent } from '../components/register.component';
import { LoginComponent } from '../components/login.component';

@NgModule({
  declarations: [
    UserComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule ,
    RouterModule.forChild([
      { path: '', component: UserComponent,
        children: [
          { path: 'register', component: RegisterComponent},
          { path: 'login', component: LoginComponent},
        ]
    }])
  ],
  providers: [],
  bootstrap: [UserComponent]
})
export class UsersModule { }
