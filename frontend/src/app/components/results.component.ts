import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-results',
  template: `
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


<div class="row mx-5 my-4">
    <div class="col-md-6">
        <div class="card mb-3" (click)="open(content)">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card mb-3" (click)="open(content)">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-6">
    <div class="card mb-3" (click)="open(content)">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content
                        is a little bit longer.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-md-6">
<div class="card mb-3" (click)="open(content)">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    This is a wider card with supporting text below as a
                    natural lead-in to additional content. This content
                    is a little bit longer.
                </p>
            </div>
        </div>
    </div>
</div>
</div>

<div class="col-md-6">
<div class="card mb-3" (click)="open(content)">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    This is a wider card with supporting text below as a
                    natural lead-in to additional content. This content
                    is a little bit longer.
                </p>
            </div>
        </div>
    </div>
</div>
</div>

<div class="col-md-6">
<div class="card mb-3" (click)="open(content)">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    This is a wider card with supporting text below as a
                    natural lead-in to additional content. This content
                    is a little bit longer.
                </p>
            </div>
        </div>
    </div>
</div>
</div>

<div class="col-md-6">
<div class="card mb-3" (click)="open(content)">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    This is a wider card with supporting text below as a
                    natural lead-in to additional content. This content
                    is a little bit longer.
                </p>
            </div>
        </div>
    </div>
</div>
</div>

<div class="col-md-6">
<div class="card mb-3" (click)="open(content)">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    This is a wider card with supporting text below as a
                    natural lead-in to additional content. This content
                    is a little bit longer.
                </p>
            </div>
        </div>
    </div>
</div>
</div>

<div class="col-md-6">
<div class="card mb-3" (click)="open(content)">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    This is a wider card with supporting text below as a
                    natural lead-in to additional content. This content
                    is a little bit longer.
                </p>
            </div>
        </div>
    </div>
</div>
</div>

<div class="col-md-6">
<div class="card mb-3" (click)="open(content)">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="./assets/images/user_default_icon.png" class="card-img" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    This is a wider card with supporting text below as a
                    natural lead-in to additional content. This content
                    is a little bit longer.
                </p>
            </div>
        </div>
    </div>
</div>
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
`
})
export class ResultsComponent {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

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