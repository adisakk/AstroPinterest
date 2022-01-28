import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DatepickerComponent } from './datepicker/datepicker/datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';

import { SourceselectorComponent } from './sourceselector/sourceselector/sourceselector.component';
import { MatRadioModule} from '@angular/material/radio';
import { ImageviewerComponent } from './imageviewer/imageviewer.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { SavemyfavoritesComponent } from './savemyfavorites/savemyfavorites/savemyfavorites.component';
import { ConfigComponent } from './config/config.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    SourceselectorComponent,
    ImageviewerComponent,
    SavemyfavoritesComponent,
    ConfigComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    YouTubePlayerModule,
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
