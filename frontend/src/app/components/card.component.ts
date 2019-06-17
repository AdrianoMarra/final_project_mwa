import { Component, OnInit, Input} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUsersService } from '../services/getusers.service';

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
            <h4 class="card-title" ></h4>
            <h6 class="card-subtitle mb-2 text-muted"></h6>
                <p class="card-text" >
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
                <h4></h4>
            </div>
            <table class="table table-user-information">
                <tbody>
                <tr>
                    <td>Specialty:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Experience level:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Hour Rate:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Phone number:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Address:</td>
                    <td></td>
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
export class CardComponent implements OnInit {
    @Input() test: String;
    apiResponse: any;
    
    public isCollapsed = false;
    constructor(config: NgbModalConfig, private modalService: NgbModal,private getDataService: GetUsersService) { 
        config.backdrop = 'static';
        config.keyboard = false;
    }

    open(content) {
      this.modalService.open(content);
    }
    ngOnInit() {
      this.getDataService.getData({}).subscribe((resp) => {
          this.apiResponse = resp;
      });
    }

    
}
