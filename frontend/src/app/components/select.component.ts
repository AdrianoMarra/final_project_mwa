import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  template: `
    <div ngbDropdown class="d-inline-block w-100">
        <button class="btn btn-outline-primary w-100 text-left" id="dropdownBasic1" type="button" ngbDropdownToggle> {{ btnText }} </button>
        <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
            <button ngbDropdownItem class="test" type="button" *ngFor="let option of dropDownOptions" (click)="updateText(option)"> {{ option }} </button>
        </div>
    </div>
  `,
  styles: [`div.dropdown-menu.show {
    max-height: 300px;
    overflow-y: scroll;
}`]
})
export class SelectComponent implements OnInit {

  @Input() btnText: string;
  @Input() dropDownOptions: [];
  @Output() valueChange = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  updateText(val) {
    this.btnText = val;
    this.valueChange.emit(this.btnText);
  }

}
