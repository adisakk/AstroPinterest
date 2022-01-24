import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-savemyfavorites',
  templateUrl: './savemyfavorites.component.html',
  styleUrls: ['./savemyfavorites.component.css']
})
export class SavemyfavoritesComponent implements OnInit {

  constructor() { }

  @Output() clickFunctionCalled = new EventEmitter<any>();
  callFunction() {
    console.log("callFunction");
    this.clickFunctionCalled.emit();   
  }

  ngOnInit(): void {
  }

}
