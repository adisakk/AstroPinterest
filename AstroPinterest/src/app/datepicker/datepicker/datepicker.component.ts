import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  limitHistoryDate = new Date();
  todayDate = new Date();
  @Output() newApodDateEvent = new EventEmitter<string>();

  changeNewApodDate(value: string) {
    this.newApodDateEvent.emit(value);
  }
   
  constructor() {
    this.limitHistoryDate.setDate(this.limitHistoryDate.getDate() - 3650);
  }

  ngOnInit(): void {
  }

}
