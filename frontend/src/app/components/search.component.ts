import { Component, ElementRef, OnInit } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { GetUsersService } from '../services/getusers.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
selector: 'app-search',
template: `
    <div class="px-5">
        <form class="needs-validation" [formGroup]="myForm" #movieSearchInput>
            <div class="form-row">
                <div class="col-md-5 mb-3">
                    <label for="validationCustomUsername">What are you looking for?</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                        <input class="form-control" type="search" placeholder="Search" aria-label="Search" [formControl]="myForm.get('description')">
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="location">Location</label>
                    <input type="text" class="form-control" id="location" placeholder="Location">
                </div>
                <div class="col-md-3 mb-3">
                    <label for="validationCustom02">Worker specialty</label>
                    <app-select [btnText]=specialtiesText [dropDownOptions]=specialtiesOptions (valueChange)='updateSpecialty($event)'></app-select>
                </div>
            </div>

            <div class="form-row">
                <div class="col-md-6 mb-3">
                    <label for="validationCustom03">Price per hour range</label>

                    <div class="w-100">
                        <div class="col-md-6 float-left pl-0">
                            <app-select [btnText]=minPriceText [dropDownOptions]=priceOptions (valueChange)='updateMinPrice($event)'></app-select>
                        </div>

                        <div class="col-md-6 float-left pl-0">
                            <app-select [btnText]=maxPriceText [dropDownOptions]=maxPriceOptions (valueChange)='updateMaxPrice($event)'></app-select>
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
                    <input type="text" class="form-control" placeholder="Name" [formControl]="myForm.get('name')">
                </div>
            </div>
        </form>
    <div>
`,
})
export class SearchComponent implements OnInit {
    private specialtiesOptions = [ 'Frontend developer', 'Backend developer', 'Tutor'];
    private priceOptions = ['10.00', '15.00', '20.00', '50.00', '60.00'];
    private availabilityOptions = ['Weekends', 'Week Days'];
    private maxPriceOptions = this.priceOptions;
    private minPriceText = 'Min price';
    private maxPriceText = 'Max price';
    private specialtiesText = 'Select the specialty';
    private availabilityText = 'Select the worker availability';
    myForm: FormGroup;
    apiResponse: any;
    isSearching: boolean;
    queryObj = {
                'specialty': '',
                'hour_rate_min': '',
                'hour_rate_max': ''
            };

    constructor(private getDataService: GetUsersService, private fb: FormBuilder, private myElement: ElementRef) {
       this.myForm = fb.group({
        'description': [''],
        'location': [''],
        'name': ['']
      });

       this.isSearching = false;
       this.apiResponse = [];
    }

    ngOnInit() {
        this.getDataService.getData({}).subscribe((resp) => {
            this.apiResponse = resp;
        });
        this.onKeyUpEvent();
        this.updateSearch();
      }

    onKeyUpEvent() {
        fromEvent(this.myElement.nativeElement, 'keyup').pipe(
            // get value
            map((event: any) => {
              return event.target.value;
            })
            // Time in milliseconds between key events
            ,debounceTime(1000)
            // If previous query is diffent from current
            ,distinctUntilChanged()
            // subscription for response
            ).subscribe(() => {
                this.updateSearch();
            });
    }

    updateSearch() {
        const query = Object.assign(this.queryObj, this.myForm.value);
        this.isSearching = true;
        this.getDataService.getData(query).subscribe((res) => {
          console.log('res', res);
          this.isSearching = false;
          this.apiResponse = res;
        }, (err) => {
          this.isSearching = false;
          console.log('error', err);
        });
    }

    updateSpecialty(specialty) {
        this.queryObj.specialty = specialty;
        this.updateSearch();
    }

    updateMinPrice(minPrice) {
        // Calc the options for the max price dropdown:
        this.maxPriceOptions = [];
        from(this.priceOptions).pipe(
            filter( num => num >= minPrice )
        ).subscribe( res => {
            this.maxPriceOptions.push(res);
        });

        this.queryObj.hour_rate_min = minPrice;
        this.updateSearch();
    }

    updateMaxPrice(maxPrice) {
        this.queryObj.hour_rate_max = maxPrice;
        this.updateSearch();
    }
}