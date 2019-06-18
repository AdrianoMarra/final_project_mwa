import {Component, ElementRef} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GetUsersService } from '../services/getusers.service';

@Component({
  selector: 'app-results',
  template: `
<div class="loading" *ngIf="isLoading">
  <div class="spinner-border-wrapper">
    <div class="spinner-grow text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
      <div class="spinner-grow text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</div>


  <ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Profile update</h4>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    Content here...
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="modal.close('Save click')">Save</button>
  </div>
</ng-template>


<div class="row mx-5 my-4" *ngIf="results">
    <div class="col-md-12 col-lg-6"  *ngFor="let user of results.results">
        <kanban-card [worker]=user></kanban-card>
    </div>
</div>


<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
`,
styles: [
  `.loading {
    display: block;
    position: absolute;
    //background-color: #167bff0a;
    width: 100%;
    height: 100%;
    z-index: 1;
    text-align: center;
  }
  .spinner-border-wrapper {
    margin: 0;
    position: absolute;
    top: 20%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%) }
  } `
]
})
export class ResultsComponent {
  closeResult: string;
  results: any;
  isLoading: any;

  constructor(private modalService: NgbModal, private getDataService: GetUsersService, private myElement: ElementRef) {
    this.getDataService.resultsObservable.subscribe(value => {
      this.results = value;
    });

    this.getDataService.loaddingObservable.subscribe(value => {
      // This is to fake the loading because the results are too quick
      // to get the real loading just comment the setTimeout and set
      // this.isLoading = value;

      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}