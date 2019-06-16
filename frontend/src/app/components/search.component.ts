import { Component, Output } from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GetUsersService } from "../services/getusers.service";

@Component({
selector: 'app-search',
template: `
    <div class="px-5">
        <form class="needs-validation" novalidate>
            <div class="form-row">
                <div class="col-md-5 mb-3">
                    <label for="validationCustomUsername">What are you looking for?</label>
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
                    <label for="location">Location</label>
                    <input type="text" class="form-control" id="location" placeholder="Location">
                </div>
                <div class="col-md-3 mb-3">
                    <label for="validationCustom02">Worker specialty</label>
                    <app-select [btnText]=specialtiesText [dropDownOptions]=specialtiesOptions></app-select>
                </div>
            </div>

            <div class="form-row">
                <div class="col-md-6 mb-3">
                    <label for="validationCustom03">Hour rate range</label>

                    <div class="w-100">
                        <div class="col-md-6 float-left pl-0">
                            <app-select [btnText]=minPriceText [dropDownOptions]=priceOptions (valueChange)='calcMaxPriceOptions($event)'></app-select>
                        </div>

                        <div class="col-md-6 float-left pl-0">
                            <app-select [btnText]=maxPriceText [dropDownOptions]=maxPriceOptions deactivate="true"></app-select>
                        </div>
                    </div>

                </div>
                <div class="col-md-3 mb-3">
                    <label for="validationCustom02">Worker availability</label>
                    <div ngbDropdown class="d-inline-block w-100">
                        <app-select [btnText]=availabilityText [dropDownOptions]=availabilityOptions deactivate="true"></app-select>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="validationCustom05">Worker name</label>
                    <input type="text" class="form-control" id="validationCustom05" placeholder="Name">
                </div>
            </div>
        </form>
    <div>
        `,
})
export class SearchComponent {
    private specialtiesOptions = [ 'Frontend developer', 'Backend developer', 'Tutor'];
    private priceOptions = ['10.00', '15.00', '20.00', '50.00', '60.00'];
    private availabilityOptions = ['Weekends', 'Week Days'];
    private maxPriceOptions = this.priceOptions;
    private minPriceText = 'Min price per hour';
    private maxPriceText = 'Max price per hour';
    private specialtiesText = 'Select the specialty';
    private availabilityText = 'Select the worker availability';

    constructor(private getDataService: GetUsersService) {
       let results$ = getDataService.getData();
    }

    calcMaxPriceOptions(minPrice) {
        this.maxPriceOptions = [];
        from(this.priceOptions).pipe(
            filter( num => num >= minPrice )
        ).subscribe( res => {
            this.maxPriceOptions.push(res);
        });
    }
}