import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  limitHistoryDate = new Date();
  todayDate = new Date();
   
  constructor() {
    this.limitHistoryDate.setDate(this.limitHistoryDate.getDate() - 3650);
  }

  ngOnInit(): void {
  }

}
