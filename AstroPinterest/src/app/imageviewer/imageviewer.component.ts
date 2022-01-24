import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Apod } from '../model/Apod';
import { ApodService } from '../service/apod.service';

@Component({
  selector: 'app-imageviewer',
  templateUrl: './imageviewer.component.html',
  providers: [ApodService],
  styleUrls: ['./imageviewer.component.css']
})
export class ImageviewerComponent implements OnInit {

  sanitizer: DomSanitizer | undefined;
  image_path: String | undefined;
  image_paths = '';

  apod: Apod = new Apod;
  apods: Apod[] = [];
  currentApodDate = '';
  apodSource = 0;
  currentApodSource = 0; //0: NASA, 1: MyFavorites

  constructor(private domSanitizer:DomSanitizer, private apodService: ApodService) {
  }

  ngOnInit() {
    this.getApod();
    this.getRandomApods();
  }

  setCurrentApodDate(newDate: string) {
    var m = new Date(newDate);
    this.currentApodDate = m.getUTCFullYear() + "-" + ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" + ("0" + m.getUTCDate()).slice(-2)
    
    this.getPreviousApodByDate(this.currentApodDate);
  }
  
  getApod(): void {
    this.apodService.getApod()
      .subscribe((apod: any) => (this.apod = apod));
  }

  getPreviousApodByDate(apodDate: string): void {
    this.apodService.getPreviousApodByDate(apodDate)
      .subscribe((apod: Apod) => (this.apod = apod));
  }

  getRandomApods(): void {
    this.apodService.getRandomApods(6)
      .subscribe((apods: Apod[]) => (this.apods = apods));
  }

  saveMyFavorite(): void {
    this.apodService.saveMyFavoriteApod(this.apod).subscribe();
    this.displayMessage("Saved!")
  }

  deleteMyFavorite(): void {
    this.apodService.deleteMyFavoriteApod(this.apod).subscribe();
    this.updateCurrentApods();
    this.displayMessage("Deleted!")
  }

  displayMessage(str: string){
    alert(str);
  }

  changeApodSource(value: any){
    this.apodSource = value;
    this.updateCurrentApods();
  }

  private updateCurrentApods() {
    this.apodService.getMyFovoriteApods(6)
      .subscribe((apods: Apod[]) => (this.apods = apods));
  }

  changeCurrentApod(apod: Apod){
    this.apod = apod;
  }

}
