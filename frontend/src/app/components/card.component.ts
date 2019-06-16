import { Component, Input } from '@angular/core';

@Component({
  selector: 'kanban-card',
  template: `
    <div class="card mb-3" (click)="open(content)">
      <div class="row no-gutters">
          <div class="col-md-4">
            <img class="avatar rounded-circle" src="./assets/images/avatar_male.png" alt="Bologna">
            <a href="#" class="btn btn-outline-info more">Details</a>
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <h4 class="card-title" >{{firstName}} {{lastName}}</h4>
            <h6 class="card-subtitle mb-2 text-muted">{{specialty}}</h6>
                <p class="card-text">{{description}}
                </p>
            </div>
          </div>
      </div>
  </div>
`,
styles: [`.avatar {
    border: 0.3rem solid rgba(#fff, 0.3);
    margin-bottom: 1rem;
    max-width: 9rem;
    margin-top: 1.5rem;
    margin-left: 2rem;
  }
  .more {
    display: inline;
    margin-left: 4rem;
  }`]
})
export class CardComponent {
    @Input() firstName: string = 'Joe';
    @Input() lastName: string = 'Black';
    @Input() specialty: string = 'Web Developer';
    @Input() description: string = 'His career has included critical and popular success in his youth, followed by a period of substance abuse and legal difficulties, and a resurgence of commercial success in middle age. ';
    constructor() { }
}
