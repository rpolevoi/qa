import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { routes } from './routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { QAService } from './qa.service';
import 'hammerjs';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(routes, { useHash: false }),
  ],
  providers: [QAService],
  bootstrap: [AppComponent]
})
export class AppModule { }
