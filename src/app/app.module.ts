import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { routes } from './routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { QAService } from './qa.service';
import { UserService } from './user.service';
import { HistoryService } from './history.service';
import { AuthGuard } from './auth-guard.service';
import { ResolverService } from './resolver.service';

import 'hammerjs';

import { HistoryComponent } from './history/history.component';
import { OfficeComponent } from './office/office.component';
import { QuestionDisplayComponent } from './question-display/question-display.component';
import { AnswerDisplayComponent } from './answer-display/answer-display.component';
import { ColorGridComponent } from './color-grid/color-grid.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent,
    HistoryComponent,
    OfficeComponent,
    QuestionDisplayComponent,
    AnswerDisplayComponent,
    ColorGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(routes, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),// imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [
    QAService,
    UserService,
    HistoryService,
    AuthGuard,
    ResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
