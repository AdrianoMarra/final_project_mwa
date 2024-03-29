import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersGuard } from '../guards/user-details.guard';


import { UserComponent } from '../components/user.component';
import { RegisterComponent } from '../components/register.component';
import { LoginComponent } from '../components/login.component';
import { JobComponent } from '../components/job.component';
import { DashboardComponent } from '../components/dashboard.component';
import { ChartComponent } from '../components/chart.component';


@NgModule({
  declarations: [
    UserComponent,
    RegisterComponent,
    LoginComponent,
    JobComponent,
    DashboardComponent,
    ChartComponent
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
          { path: 'dashboard', component: DashboardComponent, canActivate: [ UsersGuard ]},
          { path: 'job', component: JobComponent, canActivate: [ UsersGuard ]},
        ]
    }])
  ],
  providers: [UsersGuard],
  bootstrap: [UserComponent]
})
export class UsersModule { }
