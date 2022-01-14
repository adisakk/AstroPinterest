import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DatepickerComponent } from './datepicker/datepicker/datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';

import { SourceselectorComponent } from './sourceselector/sourceselector/sourceselector.component';
import { MatRadioModule} from '@angular/material/radio';
import { ImageviewerComponent } from './imageviewer/imageviewer/imageviewer.component';
import { SavemyfavoritesComponent } from './savemyfavorites/savemyfavorites/savemyfavorites.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    SourceselectorComponent,
    ImageviewerComponent,
    SavemyfavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
