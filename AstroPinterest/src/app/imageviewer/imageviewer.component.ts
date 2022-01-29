import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {YouTubePlayerModule} from '@angular/youtube-player';

import { Apod } from '../model/apod';
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
  thumbnailApods: [Apod[]] = [[]];
  thumbnailApodsPerRow = 5; // for display in table row
  thumbnailApodsTotal = 10;
  currentApodDate = "";
  currentApodSource = "NASA";
  showMainMediaPanel = true;
  showMainImage = true;
  showMainVideo = false;
  currentVideoId = "";
  showSaveMyFavButton = true;
  showDeleteMyFavButton = false;
  showApodDatePicker = true;
  myFavoriteStartdate = "";
  myFavoriteEnddate = "";
  

  constructor(private domSanitizer:DomSanitizer, private apodService: ApodService) {
  }

  ngOnInit() {
    this.getApodForMainMedeiaPanel();
    this.getRandomApodsForThumbtails();
  }

  setCurrentApodDate(newDate: string) {
    this.currentApodDate = this.getApodDateFormat(newDate);
    this.getPreviousApodByDate(this.currentApodDate);
  }
  
  getApodForMainMedeiaPanel(): void {
    this.apodService.getApod()
      .subscribe((apod: any) => {
        this.apod = apod;
        this.updateMainMediaPanel();
      });
  }

  getPreviousApodByDate(apodDate: string): void {
    this.apodService.getPreviousApodByDate(apodDate)
      .subscribe((apod: Apod) => {
        this.apod = apod;
        this.updateMainMediaPanel();
      });
  }

  getRandomApodsForThumbtails(): void {
    this.apodService.getRandomApods(this.thumbnailApodsTotal)
      .subscribe((apods: Apod[]) => {
        this.apods = apods;
        this.refreshThumbnailApods();
      });
  }

  saveMyFavorite(): void {
    this.apodService.saveMyFavoriteApod(this.apod).subscribe(() => {
      if(this.currentApodSource == "MyFav")
        this.refreshMyFavorites();
      this.displayMessage("Saved!");
    });
  }

  deleteMyFavorite(): void {
    this.apodService.deleteMyFavoriteApod(this.apod.date).subscribe(() => {
      this.refreshMyFavorites();
      this.showMainMediaPanel = false;
      this.displayMessage("Deleted!");
    });
  }

  setMyFavoriteStartdate(newDate: string) {
    this.myFavoriteStartdate = this.getApodDateFormat(newDate);
    this.refreshMyFavoriteThumbnails();
  }

  setMyFavoriteEnddate(newDate: string) {
    this.myFavoriteEnddate = this.getApodDateFormat(newDate);
    this.refreshMyFavoriteThumbnails();
  }

  changeCurrentApod(apod: Apod){
    this.apod = apod;
    this.updateMainMediaPanel();
  }

  changeApodSource(source: any){
    this.currentApodSource = source;

    if(this.currentApodSource == "NASA") {
      this.refreshApod();
      this.updateMainMediaPanel();
      this.showSaveMyFavButton = true;
      this.showDeleteMyFavButton = false;
      this.showApodDatePicker = true;
    }
    else {
      this.showMainMediaPanel = false;
      this.refreshMyFavorites();
      this.showSaveMyFavButton = false;
      this.showDeleteMyFavButton = true;
      this.showApodDatePicker = false;
    }
  }

  private refreshMyFavoriteThumbnails(){
    if(this.myFavoriteStartdate != "" && this.myFavoriteEnddate != ""){
      this.apodService.getMyFovoriteApodsByDateRange(
        this.myFavoriteStartdate, this.myFavoriteEnddate).subscribe((apods: Apod[]) => {
          this.apods = apods;
          this.refreshThumbnailApods();
      });
    }
  }

  private updateMainMediaPanel(){
    this.showMainMediaPanel = true;

    if(this.apod.media_type == 'video'){
      this.showMainImage = false;
      this.showMainVideo = true;
      this.setYoutubeVideoId(this.apod.url);
    } else{
      this.showMainImage = true;
      this.showMainVideo = false;
    }
  }

  private refreshApod(){
      this.getApodForMainMedeiaPanel();
      this.getRandomApodsForThumbtails();
  }

  private refreshMyFavorites() {
    this.apodService.getMyFovoriteApods(this.thumbnailApodsTotal)
      .subscribe((apods: Apod[]) => {
        this.apods = apods;
        this.refreshThumbnailApods();
      });
  }

  private refreshThumbnailApods() {
    let rowNumber = 0;
    let colNumber = 0;
    let rowApods = [];

    this.thumbnailApods = [[]];
    
    for(let i=0; i<this.apods.length; i++){
      
      rowApods[colNumber] = this.apods[i];
      colNumber++;
      if(colNumber == this.thumbnailApodsPerRow || i+1 == this.apods.length){
        this.thumbnailApods[rowNumber] = rowApods;
        rowNumber++;
        rowApods = [];
        colNumber = 0;
      }    
    }
  }

  private setYoutubeVideoId(url: string){
    let id = "";
    let pos = url.search("embed/");
    id = url.substring(pos+6, pos+6+11);

    if(id?.length != 11) {
      const params = new URL(url).searchParams;
      id = params.get('v')+"";
    }

    this.currentVideoId = id;
  }

  private getApodDateFormat(date: string){
    var m = new Date(date);
    return m.getUTCFullYear() + "-" 
    + ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" 
    + ("0" + m.getUTCDate()).slice(-2);
  }

  private displayMessage(str: string){
    alert(str);
  }

}
