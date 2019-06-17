import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
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
                    <label for="validationCustom02">Experience Level</label>
                    <div ngbDropdown class="d-inline-block w-100">
                        <app-select [btnText]=experienceLevelText [dropDownOptions]=experienceOptions (valueChange)='updateExperience($event)'></app-select>
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
    private experienceOptions = ['Junior (< 1 year)', 'Intermediate (> 2 years)', 'Senior (> 5 years)', 'Ninja (> 10 years)'];
    private maxPriceOptions = this.priceOptions;
    private minPriceText = 'Min price';
    private maxPriceText = 'Max price';
    private specialtiesText = 'Select the specialty';
    private experienceLevelText = 'Worker level of experience';
    myForm: FormGroup;
    // apiResponse: any;
    isSearching: boolean;
    queryObj = {
                'specialty': '',
                //'experience': 0,
                'hour_rate_min': '',
                'hour_rate_max': ''
            };

    @Output() resultsChange = new EventEmitter();


    constructor(private getDataService: GetUsersService, private fb: FormBuilder, private myElement: ElementRef) {
       this.myForm = fb.group({
        'description': [''],
        'location': [''],
        'name': ['']
      });

       this.isSearching = false;
    }

    ngOnInit() {
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
        //   this.apiResponse = res;
          this.getDataService.emitResults(res);
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

    updateExperience(experienceText) {
        // Calc the options for the experience dropdown:
       /* if ( experienceText == 'Junior (< 1 year)'){
            this.queryObj.experience = 1
        } else if (experienceText == 'Intermediate (> 2 years)') {
            this.queryObj.experience = 2
        } else if (experienceText == 'Senior (> 5 years)') {
            this.queryObj.experience = 5
        } else if (experienceText == 'Ninja (> 10 years)') {
            this.queryObj.experience = 10
        } else {
            this.queryObj.experience = 0
        }*/
        this.updateSearch();
    }
}