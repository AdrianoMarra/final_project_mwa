import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  template: `

    <h1>Dashboard user</h1>

    <pre> {{user}} </pre>

  `,
})
export class DashboardComponent {

    user = {"userData": "here"};
}
