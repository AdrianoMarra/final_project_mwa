import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { GetUsersService } from '../services/getusers.service';
import { JobService } from '../services/job.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
selector: 'app-search',
template: `
    <div class="px-5">
        <form class="needs-validation" [formGroup]="myForm">
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
                    <input type="text" class="form-control" id="location" placeholder="Location" [value]= this.location.results[0].formatted_address disabled>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="validationCustom02">Job Title</label>
                    <app-select [btnText]=jobTitle [dropDownOptions]=jobOptions (valueChange)='updateJob($event)'></app-select>
                </div>
            </div>

            <div class="form-row">
                <div class="col-md-6 mb-3">
                    <label for="validationCustom03">Price per hour range</label>

                    <div class="w-100">
                        <div class="col-md-6 float-left pl-0 pr-1">
                            <app-select [btnText]=minPriceText [dropDownOptions]=priceOptions (valueChange)='updateMinPrice($event)'></app-select>
                        </div>

                        <div class="col-md-6 float-left pl-1 pr-0">
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
    </div>
`,
})
export class SearchComponent implements OnInit {
    @Output() resultsChange = new EventEmitter();
    private jobOptions = [];
    private priceOptions = ['10.00', '15.00', '20.00', '50.00', '60.00'];
    private experienceOptions = ['Junior (< 1 year)', 'Intermediate (> 2 years)', 'Senior (> 5 years)', 'Ninja (> 10 years)'];
    private maxPriceOptions = this.priceOptions;
    private minPriceText = 'Min price';
    private maxPriceText = 'Max price';
    private jobTitle = 'Select the job title';
    private experienceLevelText = 'Worker level of experience';
    myForm: FormGroup;
    location: any;
    queryObj = {
                job: '',
                hour_rate_min: '',
                hour_rate_max: '',
                latitude: '',
                longitude: ''
            };

    constructor(private getDataService: GetUsersService, private saveJobService: JobService, private fb: FormBuilder, private myElement: ElementRef) {

       this.myForm = fb.group({
        'description': [''],
        'name': ['']
      });

       this.location = { results: [
            { formatted_address: 'Finding your location...' }
        ] };
    }

    ngOnInit() {
        // Uncomment this line to enable the search by location
        // this.getMyCoordenates();
        this.updateSearch();
        this.onKeyUpEvent();
        this.loadingJobs();
      }

      getMyCoordenates() {
        this.getDataService.emitLoadding(true);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const location = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            };

            this.getDataService.getAddresses(location)
                .subscribe((resp) => {
                    this.location = resp;
                    this.queryObj.latitude = this.location.results[0].geometry.location.lat;
                    this.queryObj.longitude = this.location.results[0].geometry.location.lng;
                    this.updateSearch();
                });
          });
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      }

    onKeyUpEvent() {
        fromEvent(this.myElement.nativeElement, 'keyup').pipe(
            // get value
            map((event: any) => {
              return event.target.value;
            })
            // Time in milliseconds between key events
            , debounceTime(1000)
            // If previous query is diffent from current
            , distinctUntilChanged()
            // subscription for response
            ).subscribe(() => {
                this.updateSearch();
            });
    }

    updateSearch() {
        const query = Object.assign(this.queryObj, this.myForm.value);
       // this.getDataService.emitLoadding(true);
        this.getDataService.getData(query).subscribe((res) => {
          this.getDataService.emitResults(res);
         // this.getDataService.emitLoadding(false);
          console.log(res);
    }, (err) => {
          //this.getDataService.emitLoadding(false);
          console.log('error', err);
        });
    }

    updateJob(job) {
        this.queryObj.job = job;
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

    loadingJobs() {
        this.saveJobService.getJobs().subscribe((res) => {
         const jobs = res['results']; 
         for(let i in jobs){
             this.jobOptions.push(jobs[i].title);
         }
        }, (err) => {
          console.log('error', err);
        });
      }
}