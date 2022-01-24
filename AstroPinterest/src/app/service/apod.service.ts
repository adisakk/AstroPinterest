import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { Apod } from '../model/Apod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApodService {
  // URL to the backend Apod api
  apodUrl = 'api/get-apod';
  previousApodUrl = "api/get-apod-bydate";
  randomApodUrl = 'api/get-random-apod';
  saveMyFavoriteApodUrl = "api/myfavorite";
  myFavoriteApodsUrl = "api/myfavorites";
  deleteMyFavoriteUrl = "api/myfavorite";

  private handleError: HandleError;
  
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  //TODO Implement caching request

  /** GET Apod from NASA server */
  getApod(): Observable<Apod | undefined> {
    return this.http.get<Apod>(this.apodUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getApod', undefined))
      );
  }

  /** GET previous Apod from NASA server by specific date*/
  getPreviousApodByDate(term: any): Observable<Apod> {
    const options = term ? { params: new HttpParams().set('date', term) } : {};
    return this.http.get<Apod>(this.previousApodUrl, options)
      .pipe(
        catchError(this.handleError('getPreviousApodByDate', new Apod()))
      );
  }

   /** GET my favorite Apod from db server by specific date*/
   getMyFovoriteApods(term: any): Observable<Apod[]> {
    
    return this.http.get<Apod[]>(this.myFavoriteApodsUrl, httpOptions)
      .pipe(
        catchError(this.handleError<Apod[]>('getMyFovoriteApods', []))
      );
  }


  /* GET random Apods */
  getRandomApods(term: any): Observable<Apod[]> {
    // Add safe, URL encoded search parameter if there is a search term
    const options = term ? { params: new HttpParams().set('count', term) } : {};
    return this.http.get<Apod[]>(this.randomApodUrl, options)
      .pipe(
        catchError(this.handleError<Apod[]>('getRandomApod', []))
      );
  }

  /* SAVE my favorite Apod */
  saveMyFavoriteApod(apod: Apod) {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.post<Apod>(this.saveMyFavoriteApodUrl, apod, httpOptions)
      .pipe(
        catchError(this.handleError('saveMyFavoriteApod', apod))
      );
  }

  /* SAVE my favorite Apod */
  deleteMyFavoriteApod(apod: Apod) {
    const url = `${this.deleteMyFavoriteUrl}/${apod.date}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError('deleteMyFavoriteApod'))
    );
  }

}
