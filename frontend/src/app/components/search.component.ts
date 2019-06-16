import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `


  <div class="px-5">
  <form class="needs-validation" novalidate>
      <div class="form-row">
          <div class="col-md-4 mb-3">
              <label for="validationCustomUsername">What are you looking?</label>
              <div class="input-group">
                  <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroupPrepend">
                          <i class="fa fa-search"></i>
                      </span>
                  </div>
                  <input class="form-control" type="search" placeholder="Search" aria-label="Search">
              </div>
          </div>
          <div class="col-md-4 mb-3">
              <label for="validationCustom01">First name</label>
              <input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Mark" required>
              <div class="valid-feedback">
                  Looks good!
              </div>
          </div>
          <div class="col-md-4 mb-3">
              <label for="validationCustom02">Last name</label>
              <input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required>
              <div class="valid-feedback">
                  Looks good!
              </div>
          </div>
      </div>
      <div class="form-row">
          <div class="col-md-6 mb-3">
              <label for="validationCustom03">City</label>
              <input type="text" class="form-control" id="validationCustom03" placeholder="City" required>
              <div class="invalid-feedback">
                  Please provide a valid city.
              </div>
          </div>
          <div class="col-md-3 mb-3">
              <label for="validationCustom04">State</label>
              <input type="text" class="form-control" id="validationCustom04" placeholder="State" required>
              <div class="invalid-feedback">
                  Please provide a valid state.
              </div>
          </div>
          <div class="col-md-3 mb-3">
              <label for="validationCustom05">Zip</label>
              <input type="text" class="form-control" id="validationCustom05" placeholder="Zip" required>
              <div class="invalid-feedback">
                  Please provide a valid zip.
              </div>
          </div>
      </div>
  </form>
  <div>
  `,
})
export class SearchComponent {
}



