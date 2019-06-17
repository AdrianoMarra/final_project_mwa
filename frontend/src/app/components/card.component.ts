import { Component, Input} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kanban-card',
  template: `
    <div class="card mb-3">
      <div class="row no-gutters">
          <div class="col-md-4">
            <img class="avatar rounded-circle" src="./assets/images/avatar_male.png" alt="Bologna">
            <a href="#" class="btn btn-outline-info more" (click)="open(content)">See profile</a>
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
      
      <ng-template #content let-c="close" let-d="dismiss">
        <div class="modal-header">
            <h4 class="modal-title" id="modal-basic-title">Profile</h4>
            <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="col-sm-6 col-md-8">
                <h4>{{firstName}} {{lastName}}</h4>
            </div>
            <table class="table table-user-information">
                <tbody>
                <tr>
                    <td>Specialty:</td>
                    <td>{{specialty}}</td>
                </tr>
                <tr>
                    <td>Experience level:</td>
                    <td>{{experience}}</td>
                </tr>
                <tr>
                    <td>Hour Rate:</td>
                    <td>{{hour_rate}}</td>
                </tr>
                <tr>
                    <td>Phone number:</td>
                    <td>{{phone_number}}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>{{email}}</td>
                </tr>
                <tr>
                    <td>Address:</td>
                    <td>{{street}} {{city}} <br/> {{state}} {{zip_code}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" (click)="c('Save click')">Close</button>
        </div>
      </ng-template>

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
    margin-left: 3rem;
  }
  `],
  providers: [NgbModalConfig, NgbModal]
})
export class CardComponent {
    @Input() firstName: string = 'Joe';
    @Input() lastName: string = 'Black';
    @Input() specialty: string = 'Web Developer';
    @Input() description: string = 'His career has included critical and popular success in his youth, followed by a period of substance abuse and legal difficulties, and a resurgence of commercial success in middle age. ';
    @Input() experience: string = 'Advanced';
    @Input() hour_rate: Number = 45;
    @Input() phone_number: string = '4259198888';
    @Input() email: string = 'test@gmail.com';
    @Input() street: string = '5000 119th Ave. SE';
    @Input() city: string = 'Bellevue';
    @Input() state: string = 'WA';
    @Input() zip_code: string = '98006';
    
    public isCollapsed = false;
    constructor(config: NgbModalConfig, private modalService: NgbModal) { 
        config.backdrop = 'static';
        config.keyboard = false;
    }

    open(content) {
    this.modalService.open(content);
  }
}