import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersDetailsComponent } from './usersdetails.component';
import { UserDetailsGuard } from '../guards/user-details.guard';


@NgModule({
  declarations: [
    UsersComponent,
    UsersDetailsComponent
  ],
  imports: [
    CommonModule ,
    RouterModule.forChild([
        { path: '', component: UsersComponent,
        children: [ {path: ':uuid', component: UsersDetailsComponent, canActivate: [ UserDetailsGuard ]}
        ]
      }])
  ],
  providers: [UserDetailsGuard],
  bootstrap: [UsersComponent]
})
export class UsersModule { }
