import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {  AngularFireModule, AuthMethods, AuthProviders } from "angularfire2";

import { routes } from './routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { QAService } from './qa.service';
import 'hammerjs';
import { HistoryComponent } from './history/history.component';
import { SeriousComponent } from './serious/serious.component';


export const firebaseConfig  = {
    apiKey: "AIzaSyDiFnRd4y_esIYp5TVl0Dfm4QFNM_1zz-w",
    authDomain: "qaproject-c3e87.firebaseapp.com",
    databaseURL: "https://qaproject-c3e87.firebaseio.com",
    projectId: "qaproject-c3e87",
    storageBucket: "qaproject-c3e87.appspot.com",
    messagingSenderId: "738402159958"
  };





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent,
    HistoryComponent,
    SeriousComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(routes, { useHash: false }),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [QAService],
  bootstrap: [AppComponent]
})
export class AppModule { }
