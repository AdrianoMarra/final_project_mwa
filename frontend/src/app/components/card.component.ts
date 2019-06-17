
import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kanban-card',
  template: `
    <div class="card mb-3">
      <div class="row no-gutters">
          <div class="col-md-4  pb-4">
            <img class="avatar rounded-circle" src="./assets/images/avatar_male.png" alt="Bologna">
            <button class="btn btn-outline-info more" (click)="open(content)">See profile</button>
          </div>

          <div class="col-md-8">
            <div class="card-body">
            <h4 class="card-title" >{{worker.name.first}} {{worker.name.last}}</h4>
            <h6 class="card-subtitle mb-2 text-muted"> -- {{worker.job.title}} --</h6>
                <p class="card-text mb-2">
                  <strong>Intro:</strong> {{worker.description}}
                </p>
                <p class="card-text mb-2">
                <strong>Cost per hour:</strong> $ {{worker.hour_rate}}
              </p>
              <p class="card-text mb-2">
              <strong>Location:</strong> {{worker.address.city}} - {{worker.address.state}}, USA
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

            <div class="row">
              <div class="col-md-3 text-center">
                  <img class="avatar rounded-circle ml-0" src="./assets/images/avatar_male.png" alt="Bologna">
                  <h4 class="card-title">{{worker.name.first}} {{worker.name.last}}</h4>
              </div>

              <div class="col-md-9 pt-5 pr-5">
              <h5 class="card-subtitle mb-2 text-muted"> Worker description </h5>
                  <span> {{worker.description}}</span>
              </div>
            </div>

            <table class="table table-user-information">
                <tbody>
                <tr>
                    <td>Job Title:</td>
                    <td>{{worker.job.title}}</td>
                </tr>
                <tr>
                    <td>Experience Level:</td>
                    <td>{{worker.experience}}</td>
                </tr>
                <tr>
                    <td>Hour Rate:</td>
                    <td>$ {{worker.hour_rate}}</td>
                </tr>
                <tr>
                    <td>Phone Number:</td>
                    <td>{{worker.phone_number}}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>{{worker.email}}</td>
                </tr>
                <tr>
                    <td>Address:</td>
                    <td>{{worker.address.street}}, {{worker.address.city}} - {{worker.address.state}} {{worker.address.zip_code}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary" (click)="c('Save click')">Close</button>
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
  .card {
    box-shadow: 5px 5px #b3d7ff4f;
  }
  .more {
    display: inline;
    margin-left: 3rem;
  }
  .btn-outline-info {
    color: #007bff;
    border-color: #007bff;
    8: ;
  }
  .card-title{
    color: #007bff;
  }
  .show>.btn-outline-info.dropdown-toggle {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
  .btn-outline-info:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
  `],
  providers: [NgbModalConfig, NgbModal]
})

export class CardComponent implements OnChanges {
    @Input() worker: any;
    
    public isCollapsed = false;

    constructor(config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnChanges(value) {
      this.worker = value.worker.currentValue;
      console.log(this.worker);
    }

    open(content) {

    this.modalService.open(content, { size: 'lg' });
  }
}
